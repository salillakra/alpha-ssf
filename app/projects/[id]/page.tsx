"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // You may need to install lucide-react
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  markdown: string;
  coverImage?: string;
  createdAt: string;
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/getprojects?id=${id}`);
        if (!res.ok) throw new Error("Project not found");
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error(error);
        router.push("/projects");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProject();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-700 rounded mb-4"></div>
          <div className="h-64 w-full max-w-4xl bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-full max-w-4xl bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-5/6 max-w-4xl bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!project)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <h2 className="text-2xl font-bold text-gray-200">Project not found</h2>
        <button
          onClick={() => router.push("/projects")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Return to Projects
        </button>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-100">
      <div className="container mx-auto p-6 max-w-4xl">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Projects</span>
        </button>

        {project.coverImage && (
          <div className="mb-8 overflow-hidden rounded-xl shadow-lg">
            <Image
              height={1080}
              width={1920}
              src={project.coverImage}
              alt={project.title}
              className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <h1 className="text-5xl font-bold mb-6 text-gray-100 leading-tight">
          {project.title}
        </h1>

        <div className="text-sm text-gray-400 mb-8">
          Published on{" "}
          {new Date(project.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <div
          className="prose prose-lg prose-invert max-w-none prose-headings:text-gray-100 prose-a:text-blue-400 prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: project.markdown }}
        />
      </div>
    </div>
  );
}
