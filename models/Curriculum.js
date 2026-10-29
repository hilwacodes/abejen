import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  videoUrl: { type: String },
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  lessons: [LessonSchema],
});

const CurriculumSchema = new mongoose.Schema({
  grade: { type: Number, required: true, enum: [8, 9, 10, 11, 12] },
  stream: { 
    type: String, 
    enum: ['General', 'Natural Sciences', 'Social Sciences'], 
    default: 'General' 
  },
  courses: [CourseSchema],
}, { timestamps: true });

export default mongoose.models.Curriculum || mongoose.model('Curriculum', CurriculumSchema);