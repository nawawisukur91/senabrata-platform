"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ==========================================
// 1. GLOBAL SETTINGS (Untuk Link Tunggal)
// ==========================================

export async function getGlobalSettings() {
  try {
    const settings = await prisma.setting.findUnique({
      where: { id: "global-config" }
    });
    return settings;
  } catch (error) {
    console.error("Gagal ambil settings:", error);
    return null;
  }
}

export async function updateAdminContent(data: { youtube?: string; edufarm?: string }) {
  try {
    await prisma.setting.upsert({
      where: { id: "global-config" },
      update: {
        youtubeCeritaKita: data.youtube,
        articleEdufarm: data.edufarm,
      },
      create: {
        id: "global-config",
        youtubeCeritaKita: data.youtube,
        articleEdufarm: data.edufarm,
      },
    });

    revalidatePath("/story");
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// 2. STORIES MANAGEMENT (Untuk Grid Youtube)
// ==========================================

// Ambil semua video buat ditampilin di grid Story Page
export async function getAllStories() {
  try {
    return await prisma.story.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' } // Biar yang terbaru nangkring di atas
    });
  } catch (error) {
    console.error("Gagal ambil stories:", error);
    return [];
  }
}

// Fungsi buat Admin nambahin video baru ke koleksi
export async function createNewStory(data: { title: string; youtubeUrl: string; tags: string[] }) {
  try {
    // Ekstrak ID Youtube (karena di model kamu ada field youtubeVideoId)
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = data.youtubeUrl.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (!videoId) throw new Error("Link YouTube tidak valid");

    const newStory = await prisma.story.create({
      data: {
        title: data.title,
        youtubeUrl: data.youtubeUrl,
        youtubeVideoId: videoId,
        tags: data.tags,
        isPublished: true,
        author: "Admin Senabrata"
      }
    });

    revalidatePath("/story");
    return { success: true, data: newStory };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}