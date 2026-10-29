'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [curriculums, setCurriculums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/curriculum')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCurriculums(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch curriculum:', err);
        setLoading(false);
      });
  }, []);

  const filteredCurriculums = curriculums.filter((item) => {
    const matchesGrade = selectedGrade === 'all' || item.grade === selectedGrade;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      query === '' ||
      item.stream.toLowerCase().includes(query) ||
      item.courses.some((course: any) => 
        course.title.toLowerCase().includes(query) ||
        (course.description && course.description.toLowerCase().includes(query)) ||
        course.lessons.some((lesson: any) => 
          lesson.title.toLowerCase().includes(query) || 
          lesson.content.toLowerCase().includes(query)
        )
      );

    return matchesGrade && matchesSearch;
  });

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2563eb' }}>📚 Abejen Educational Platform</h1>
      <p style={{ fontSize: '18px', color: '#4b5563' }}>
        Empowering Ethiopian High School Students (Grades 8–12)
      </p>

      <hr style={{ margin: '20px 0', border: '1px solid #e5e7eb' }} />

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search subjects, topics, or keywords (e.g., Economics, Vectors, Sets)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Grade Filter Bar */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '16px', color: '#374151' }}>Filter by Grade:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['all', 8, 9, 10, 11, 12].map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade as any)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                background: selectedGrade === grade ? '#2563eb' : '#e5e7eb',
                color: selectedGrade === grade ? '#ffffff' : '#374151',
                transition: 'background 0.2s'
              }}
            >
              {grade === 'all' ? 'All Grades' : `Grade ${grade}`}
            </button>
          ))}
        </div>
      </div>

      <h2>Available Curriculum (Click any card to open full study view):</h2>

      {loading ? (
        <p>Loading curriculum data...</p>
      ) : filteredCurriculums.length === 0 ? (
        <p style={{ color: '#6b7280', fontStyle: 'italic', marginTop: '10px' }}>
          No matching curriculum found. Try searching for something else!
        </p>
      ) : (
        filteredCurriculums.map((item) => (
          <div 
            key={item._id} 
            onClick={() => router.push(`/course/${item._id}`)}
            style={{ 
              background: '#f9fafb', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px', 
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2563eb';
              e.currentTarget.style.background = '#f0f6ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = '#f9fafb';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#1f2937' }}>Grade {item.grade}</h3>
              <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                {item.stream} Stream →
              </span>
            </div>
            
            {item.courses.map((course: any, idx: number) => (
              <div key={idx} style={{ marginTop: '15px', paddingLeft: '15px', borderLeft: '4px solid #2563eb' }}>
                <h4 style={{ color: '#111827' }}>{course.title}</h4>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>{course.description}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </main>
  );
}