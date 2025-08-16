import mongoose from 'mongoose';
import User from '../schema/v1/user.schema';
import Event from '../schema/v1/event.schema';
import School from '../schema/v1/school.schema';
import Package from '../schema/v1/package.schema';


async function seed() {
  try {
    // ✅ DB connect
    await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
    console.log('✅ MongoDB Connected for seeding');

    // ✅ Clean old data (optional)
    await User.deleteMany({});
    await Event.deleteMany({});
    await School.deleteMany({});
    await Package.deleteMany({});
    console.log('🧹 Old data cleared');

    // ✅ Insert packageSchemas
    const packageSchemas = await Package.insertMany([
      {
        packageSchemaName: 'Basic Plan',
        price: 999,
        features: ['2 events', 'Standard venue'],
      },
      {
        packageSchemaName: 'Premium Plan',
        price: 4999,
        features: ['Unlimited events', 'VIP seating', 'Custom branding'],
      },
    ]);
    console.log('📦 packageSchemas seeded');

    // ✅ Insert Users
    const users = await User.insertMany([
      {
        role: 'admin',
        name: 'Deep',
        email: 'deep@example.com',
        password: 'hashedpassword',
      },
      {
        role: 'speaker',
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        password: 'hashedpassword',
      },
      {
        role: 'normal_user',
        name: 'Priya Singh',
        email: 'priya@example.com',
        password: 'hashedpassword',
      },
    ]);
    console.log('👤 Users seeded');

    // ✅ Insert Events
    const events = await Event.insertMany([
      {
        eventName: 'Tech Conference 2025',
        eventDate: new Date('2025-09-15'),
        eventSpeakers: [users[1]._id],
        venue: 'Delhi Convention Center',
        numberOfPeople: 300,
        status: 'upcoming',
      },
      {
        eventName: 'AI Workshop',
        eventDate: new Date('2025-07-10'),
        eventSpeakers: [users[1]._id],
        venue: 'Mumbai Tech Hub',
        numberOfPeople: 150,
        status: 'completed',
      },
    ]);
    console.log('🎤 Events seeded');

    // ✅ Insert Schools
    await School.insertMany([
      {
        schoolName: 'Green Valley High School',
        schoolAddress: '123, Park Street, Delhi',
        events: [events[0]._id, events[1]._id],
        packageSchemas: [packageSchemas[0]._id],
        principalName: 'Mr. Arjun Verma',
      },
      {
        schoolName: 'Sunrise Public School',
        schoolAddress: '456, MG Road, Mumbai',
        events: [events[0]._id],
        packageSchemas: [packageSchemas[1]._id],
        principalName: 'Mrs. Kavita Joshi',
      },
    ]);
    console.log('🏫 Schools seeded');

    console.log('🎉 Seeding complete!');
    process.exit(); // ✅ Exit after seeding
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
