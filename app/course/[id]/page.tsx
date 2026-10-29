'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';

function CourseContent() {
  const params = useParams();
  const router = useRouter();
  const [curriculum, setCurriculum] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    fetch(`/api/curriculum/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCurriculum(data.data);
        } else {
          setCurriculum(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch course details:', err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return <p>Loading course study materials...</p>;
  }

  if (!curriculum) {
    return (
      <div>
        <h2>Course not found</h2>
        <button 
          onClick={() => router.push('/')}
          style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', padding: 0, textDecoration: 'underline', marginTop: '10px' }}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Back button */}
      <button 
        onClick={() => router.push('/')}
        style={{
          background: 'none',
          border: 'none',
          color: '#2563eb',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px',
          marginBottom: '20px',
          padding: 0
        }}
      >
        ← Back to All Courses
      </button>

      <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}>
          Grade {curriculum.grade} • {curriculum.stream} Stream
        </span>
        <h1 style={{ color: '#1e293b', marginTop: '12px' }}>Study Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          Comprehensive curriculum modules and lesson materials designed for Ethiopian high school students.
        </p>
      </div>

      <h2>Courses & Lessons</h2>

      {curriculum.courses.map((course: any, idx: number) => (
        <div key={idx} style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', marginBottom: '25px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#0f172a', fontSize: '20px', marginBottom: '8px' }}>{course.title}</h3>
          <p style={{ color: '#475569', fontSize: '15px', marginBottom: '20px' }}>{course.description}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {course.lessons.map((lesson: any, lIdx: number) => (
              <div key={lIdx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '6px', borderLeft: '4px solid #2563eb' }}>
                <h4 style={{ color: '#1e293b', marginBottom: '6px' }}>{lesson.title}</h4>
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.5' }}>{lesson.content}</p>
                
                {lesson.videoUrl && (
                  <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '10px', color: '#2563eb', fontSize: '14px', fontWeight: 'bold' }}>
                    ▶ Watch Video Lesson
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CourseDetail() {
  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <Suspense fallback={<p>Loading course page...</p>}>
        <CourseContent />
      </Suspense>
    </main>
  );
}