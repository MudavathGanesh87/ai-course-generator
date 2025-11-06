"use client";
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { db } from '@/configs/db';
import CourseBasicInfo from './_components/CourseBasicInfo';
import { and, eq } from 'drizzle-orm';
import { use } from 'react';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import LoadingDialog from '../_components/LoadingDialog';
import { GenerateChapterContent_AI } from '@/configs/AiModel';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';
import { Chapters } from '@/configs/schema';



function CourseLayout({ params }) {
  const paramValues = params;
  const { courseId } = use(params);
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const router=useRouter();
  useEffect(() => {
    if (courseId) {
      GetCourse();
    }
  }, [courseId, user]);
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, courseId),
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    console.log(result);
    setCourse(result[0]);
  };

  const GenerateChapterContent = async () => {
  setLoading(true);

  const chapters = course.courseOutput.Chapters;

  for (let index = 0; index < chapters.length; index++) {
    const chapter = chapters[index];
    const PROMPT = `Explain the concept in Detail on Topic ${course.name}, Chapter: ${chapter['Chapter Name']} in JSON Format with list of array with fields as title, description in detail, Code Example (code field in <precode> format) if applicable`;

    console.log("Sending prompt to Gemini:", PROMPT);

    try {
      // Wait for videoId
      const response = await service.getVideos(course.name, chapter['Chapter Name']);
      const videoId = response[0]?.id?.videoId || '';

      // Generate chapter content
      const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
      const rawText = await result.response?.text();

      console.log("Raw response text:", rawText); // ✅ log raw text

      const content = JSON.parse(rawText);
      console.log("Parsed JSON content:", content); // ✅ log parsed content

      // Save to DB
      await db.insert(Chapters).values({
        courseId: course.courseId,
        chapterId: index,
        chapterName: chapter['Chapter Name'],
        content: content,
        videoId: videoId,
      });

    } catch (error) {
      console.error("Error generating content:", error);
    }
  }

  setLoading(false);
  router.replace('/create-course/' + course.courseId + '/finish');
};


  return (
    <div className="mt-10 px-7 md:px-20 lg:x-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <LoadingDialog loading={loading} />
      {course && <CourseBasicInfo course={course} refreshData={() => GetCourse()} />}

      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button className="my-10" onClick={GenerateChapterContent}>Generate Course Content</Button>
    </div>
  );
}

export default CourseLayout
