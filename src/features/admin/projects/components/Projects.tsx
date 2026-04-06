import { useState, useEffect, useCallback, useRef } from "react";
import { useProjects } from "../hooks/useProjects";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  X,
  ArrowLeft,
} from "lucide-react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ProjectCardSkeleton } from "./ProjectSkeleton";
import { Pagination } from "@/components/Pagination";

const Projects = () => {
  const {
    projects,
    loading,
    isError,
    errorMessage,
    setSearch,
    page,
    setPage,
    totalPages,
    hasNext,
    hasPrevious,
    deleteMutation,
    createMutation,
    updateMutation,
    refetch,
  } = useProjects();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Search Local State
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    is_published: true,
    show_on_home: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // --- Scroll to Top Utility ---
  const scrollToTop = () => {
    const mainContainer = document.querySelector("main");
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    if (window.history.state === "form-open") {
      window.history.back();
    }
    setTimeout(scrollToTop, 100);
  }, []);

  const openForm = (project: any = null) => {
    if (project) {
      setSelectedProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        url: project.url,
        is_published: project.is_published,
        show_on_home: project.show_on_home,
      });
      setPreviewUrl(project.image);
    } else {
      setSelectedProject(null);
      setFormData({
        name: "",
        description: "",
        url: "",
        is_published: true,
        show_on_home: false,
      });
      setPreviewUrl(null);
    }
    setSelectedFile(null);

    window.history.pushState("form-open", "");
    setIsFormOpen(true);
    setTimeout(scrollToTop, 100);
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsFormOpen(false);
      scrollToTop();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setTimeout(scrollToTop, 100);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(selectedProject?.image || null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, selectedProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("url", formData.url);
    data.append("is_published", String(formData.is_published));
    data.append("show_on_home", String(formData.show_on_home));

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    if (selectedProject) {
      await updateMutation.mutateAsync({
        id: selectedProject.id,
        formData: data,
      });
    } else {
      await createMutation.mutateAsync(data);
    }
    closeForm();
  };

  // --- Search Handlers ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearch(value);
  };

  const clearSearch = () => {
    setSearchValue("");
    setSearch("");
    searchInputRef.current?.focus();
  };

  return (
    <div className="bg-black min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 ">
        {/* Header Section */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-xs md:max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
              size={16}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search projects..."
              value={searchValue}
              onChange={handleSearchChange}
              className="bg-zinc-900/50 border border-zinc-800 text-white pl-10 pr-10 py-2.5 rounded-2xl text-sm outline-none focus:border-brand/40 transition-all w-full"
            />
            {searchValue && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            onClick={() => openForm()}
            className="cursor-pointer bg-brand hover:bg-brand/90 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-brand/20"
          >
            <Plus size={18} />{" "}
            <span className="hidden sm:inline">Add Project</span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : isError && errorMessage?.title !== "Not Found" ? (
          <div className="py-20">
            <div id="error-view">
              <ErrorMessage
                errorData={
                  errorMessage || {
                    title: "Error",
                    description: "Failed to load",
                  }
                }
                onRetry={refetch}
              />
            </div>
          </div>
        ) : projects.length === 0 ||
          (isError && errorMessage?.title === "Not Found") ? (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
            <div className="w-20 h-20 bg-zinc-900/50 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
              <ImageIcon className="text-zinc-700" size={32} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wider">
              No Projects Found
            </h3>
            <p className="text-zinc-500 text-sm max-w-xs mb-8">
              Your project list is empty.
            </p>
            <button
              onClick={() => openForm()}
              className="cursor-pointer flex items-center gap-2 bg-brand/10 hover:bg-brand/20 text-brand px-6 py-3 rounded-2xl border border-brand/20 text-xs font-black uppercase transition-all"
            >
              <Plus size={16} /> Create Project
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.map((project: any) => (
                <div
                  key={project.id}
                  className="group bg-[#0a0a0a] border border-zinc-900 rounded-xl sm:rounded-3xl overflow-hidden hover:border-zinc-800 transition-all duration-300 shadow-xl"
                >
                  <div className="aspect-video w-full bg-zinc-900/50 relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-800">
                        <ImageIcon size={30} />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      {project.show_on_home && (
                        <span className="bg-brand/20 backdrop-blur-md text-brand text-[7px] font-black px-1.5 py-0.5 rounded-md uppercase border border-brand/20">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-[10px] md:text-[11px] font-bold text-white mb-1 truncate uppercase tracking-tight">
                      {project.name}
                    </h3>
                    <p className="text-zinc-500 text-[9px] line-clamp-1 mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-900/50">
                      <a
                        href={project.url}
                        target="_blank"
                        className="p-1.5 bg-zinc-900 text-zinc-500 hover:text-brand rounded-lg transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => openForm(project)}
                          className="cursor-pointer p-1.5 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg transition-colors"
                        >
                          <Edit3 size={12} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setIsDeleteModalOpen(true);
                          }}
                          className="cursor-pointer p-1.5 bg-zinc-900 text-red-500/50 hover:text-red-500 rounded-lg transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          </>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black md:bg-black/90 md:backdrop-blur-md">
          <div className="bg-[#0c0c0c] w-full h-full md:h-auto md:max-w-3xl md:rounded-[2.5rem] md:border md:border-zinc-800 overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 z-10 px-6 py-5 md:px-8 md:py-6 border-b border-zinc-900 flex justify-between items-center bg-black md:bg-zinc-900/10 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={closeForm}
                  className="md:hidden p-2 -ml-2 text-zinc-400"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-xs md:text-sm font-black text-white uppercase tracking-[0.2em]">
                  {selectedProject ? "Edit Project" : "New Project"}
                </h2>
              </div>
              <button
                onClick={closeForm}
                className="hidden md:flex p-2 bg-zinc-900 rounded-full text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                    Project Cover
                  </label>
                  <div
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                    className="relative aspect-video md:aspect-square w-full rounded-3xl md:rounded-[2rem] border-2 border-dashed border-zinc-800 bg-zinc-900/20 overflow-hidden cursor-pointer hover:border-brand/40 transition-all group"
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        className="w-full h-full object-cover"
                        alt="preview"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-zinc-700 gap-3">
                        <div className="p-4 bg-zinc-900 rounded-2xl">
                          <ImageIcon size={32} />
                        </div>
                        <span className="text-[10px] font-black uppercase">
                          Tap to upload
                        </span>
                      </div>
                    )}
                    <input
                      id="fileInput"
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                        Project Name
                      </label>
                      <input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-brand/50 transition-all"
                        placeholder="Enter title"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                        Live URL
                      </label>
                      <input
                        required
                        value={formData.url}
                        onChange={(e) =>
                          setFormData({ ...formData, url: e.target.value })
                        }
                        className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-brand/50 transition-all"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                        Description
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-brand/50 resize-none transition-all"
                        placeholder="Tell us about the project..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Switch
                        label="Published"
                        active={formData.is_published}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            is_published: !formData.is_published,
                          })
                        }
                      />
                      <Switch
                        label="Home View"
                        active={formData.show_on_home}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            show_on_home: !formData.show_on_home,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="w-full mt-10 md:mt-8 bg-brand text-white py-4 md:py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-lg shadow-brand/20 active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {createMutation.isPending
                  ? "Publishing..."
                  : updateMutation.isPending
                    ? "Updating..."
                    : selectedProject
                      ? "Update Project"
                      : "Publish Project"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() =>
          deleteMutation
            .mutateAsync(selectedProject.id)
            .then(() => setIsDeleteModalOpen(false))
        }
        title={`Delete Project?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

const Switch = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 ${active ? "bg-brand/10 border-brand/30 text-brand" : "bg-zinc-900/30 border-zinc-800 text-zinc-500"}`}
  >
    <span className="text-[9px] font-black uppercase tracking-tighter">
      {label}
    </span>
    <div
      className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${active ? "bg-brand" : "bg-zinc-700"}`}
    >
      <div
        className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300`}
        style={{ left: active ? "18px" : "2px" }}
      />
    </div>
  </button>
);

export default Projects;
