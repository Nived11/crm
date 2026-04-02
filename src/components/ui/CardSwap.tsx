import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const CardSwap: React.FC<CardSwapProps> = ({
  width = 400,
  height = 500,
  cardDistance = 40,
  verticalDistance = 50,
  delay = 4000,
  onCardClick,
  skewAmount = 5,
  easing = 'elastic',
  children
}) => {
  const config = easing === 'elastic'
    ? { ease: 'elastic.out(0.6,0.9)', durDrop: 1.2, durMove: 1, durReturn: 1, promoteOverlap: 0.8, returnDelay: 0.1 }
    : { ease: 'power2.inOut', durDrop: 0.7, durMove: 0.7, durReturn: 0.7, promoteOverlap: 0.4, returnDelay: 0.2 };

  const childArr = useMemo(() => 
    Children.toArray(children).filter(isValidElement) as React.ReactElement<CardProps>[], 
    [children]
  );
  
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const isAnimating = useRef(false);

  useEffect(() => {
    const total = childArr.length;
    if (total === 0) return;

    // Initial positioning
    refs.current.forEach((el, i) => {
      if (el) {
        const slot = makeSlot(i, cardDistance, verticalDistance, total);
        gsap.set(el, {
          x: slot.x, y: slot.y, z: slot.z,
          xPercent: -50, yPercent: -50,
          skewY: skewAmount, zIndex: slot.zIndex,
          force3D: true, opacity: 1
        });
      }
    });

    const swap = () => {
      if (isAnimating.current || order.current.length < 2) return;
      isAnimating.current = true;

      const currentOrder = [...order.current];
      const frontIdx = currentOrder[0];
      const elFront = refs.current[frontIdx];
      
      if (!elFront) {
        isAnimating.current = false;
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          // അനിമേഷൻ കഴിഞ്ഞ് മാത്രം അറേ ഷഫിൾ ചെയ്യുക
          const [first, ...rest] = order.current;
          order.current = [...rest, first];
          isAnimating.current = false;
        }
      });

      // 1. ഫ്രണ്ട് കാർഡ് താഴേക്ക് പോകുന്നു
      tl.to(elFront, {
        y: '+=500',
        opacity: 0,
        duration: config.durDrop,
        ease: config.ease
      });

      // 2. ബാക്കിയുള്ള കാർഡുകൾ മുന്നിലേക്ക് വരുന്നു
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      currentOrder.slice(1).forEach((idx, i) => {
        const el = refs.current[idx];
        if (el) {
          const slot = makeSlot(i, cardDistance, verticalDistance, total);
          tl.set(el, { zIndex: slot.zIndex }, 'promote');
          tl.to(el, {
            x: slot.x, y: slot.y, z: slot.z,
            duration: config.durMove,
            ease: config.ease
          }, `promote+=${i * 0.1}`);
        }
      });

      // 3. ഫ്രണ്ട് കാർഡ് ഓടി ബാക്കിലേക്ക് കയറുന്നു
      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.set(elFront, { zIndex: backSlot.zIndex }, 'return');
      tl.to(elFront, {
        x: backSlot.x, y: backSlot.y, z: backSlot.z,
        opacity: 1, // തിരിച്ചു വരുമ്പോൾ വിസിബിൾ ആക്കുക
        duration: config.durReturn,
        ease: config.ease
      }, 'return');
    };

    const interval = setInterval(swap, delay);
    return () => clearInterval(interval);
  }, [cardDistance, verticalDistance, delay, skewAmount, easing, childArr.length]);

  return (
    <div className="relative flex items-center justify-center overflow-visible" style={{ width, height }}>
      {childArr.map((child, i) =>
        cloneElement(child, {
          key: i,
          ref: (el: HTMLDivElement) => (refs.current[i] = el),
          style: { width, height, position: 'absolute', ...(child.props.style ?? {}) },
          onClick: (e: any) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        } as any)
      )}
    </div>
  );
};

export default CardSwap;