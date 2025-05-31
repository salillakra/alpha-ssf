"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  markdown: string;
  coverImage?: string;
  createdAt: string;
}

function stripHtmlTags(html: string) {
  if (typeof window !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }
  return html.replace(/<[^>]*>?/gm, "");
}

function getPreview(html: string) {
  const text = stripHtmlTags(html);
  return text.length > 100 ? text.slice(0, 100) + "..." : text;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/getprojects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] bg-gray-950">
        <div className="animate-pulse text-xl text-gray-300">
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-5xl font-bold mb-12 pb-2 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Projects
        </h1>

        {projects.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-10 text-center shadow-lg border border-gray-800">
            <h3 className="text-xl font-medium text-gray-200 mb-2">
              No Projects Available
            </h3>
            <p className="text-gray-400">
              Check back later for new and exciting projects!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-800 hover:border-blue-500 transform hover:-translate-y-1"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                {project.coverImage ? (
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {getPreview(project.markdown)}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                      Read more →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
