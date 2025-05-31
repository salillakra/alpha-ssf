"use client";

import Tiptap from "@/components/TextEditor";
import { supabase } from "@/utils/superbase/client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export default function Home() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { data, error } = await supabase.storage
      .from("posts")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("posts")
      .getPublicUrl(filePath);

    console.log("File uploaded successfully:", data);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!heading || !content || !coverImageUrl) {
        alert("Heading, content, and cover image are required.");
        setLoading(false);
        return;
      }

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("User not authenticated.");
        alert("You must be logged in to submit a project.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: heading,
          markdown: content,
          coverImage: coverImageUrl,
        }),
      });

      const { error } = await res.json();

      if (!res.ok) {
        console.error(error);
        alert(`Failed to upload project: ${error}`);
      } else {
        alert("Project uploaded successfully!");
        setHeading("");
        setContent("");
        setCoverImageUrl(null);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-blue-400 mt-4 font-medium">Uploading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Project Upload Portal
        </h1>

        <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8">
          <form className="space-y-8">
            <div>
              <label
                htmlFor="heading"
                className="block text-lg font-medium text-blue-400 mb-2"
              >
                Project Title
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                placeholder="Enter a compelling title"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                          focus:border-transparent text-white placeholder-gray-400 transition duration-200"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="coverImage"
                className="block text-lg font-medium text-blue-400 mb-2"
              >
                Cover Image
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition duration-200">
                <input
                  type="file"
                  accept="image/*"
                  id="coverImage"
                  className="hidden"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      setLoading(true);
                      setCoverImageUrl(null);
                      const file = e.target.files[0];
                      const uploadedImageUrl = await handleImageUpload(file);
                      setCoverImageUrl(uploadedImageUrl);
                      setLoading(false);
                    }
                  }}
                />
                <label htmlFor="coverImage" className="cursor-pointer">
                  {coverImageUrl ? (
                    <div className="mt-2">
                      <Image
                        src={coverImageUrl}
                        alt="Cover Preview"
                        width={400}
                        height={240}
                        className="mx-auto rounded-lg shadow-md object-cover"
                        style={{ maxHeight: "15rem", width: "auto" }}
                        unoptimized
                      />
                      <p className="mt-2 text-blue-400">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-300">
                        <span className="font-medium text-blue-400 hover:text-blue-500">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-blue-400 mb-2">
                Content
              </label>
              <div className="bg-gray-700 rounded-lg overflow-hidden">
                <Tiptap
                  content={content}
                  onChange={(value) => setContent(value)}
                />
              </div>
            </div>
          </form>
        </div>

        <AlertDialog>
          <AlertDialogTrigger
            asChild
            className="flex justify-center w-full mx-auto"
          >
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg 
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:scale-105 
                        transition duration-200 shadow-lg"
            >
              Publish Project
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-800 border border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Confirm Publication
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                This action cannot be undone. Your project will be uploaded to
                the server and made publicly accessible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Publish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
