import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CoupleIntro from '@/components/CoupleIntro';
import EventSchedule from '@/components/EventSchedule';
import MapSection from '@/components/MapSection';
import RSVPForm from '@/components/RSVPForm';
import PhotoGallery from '@/components/PhotoGallery';
import ContactFooter from '@/components/ContactFooter';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CoupleIntro />
        <EventSchedule />
        <MapSection />
        <RSVPForm />
        <PhotoGallery />
        <ContactFooter />
      </main>
      <MusicPlayer />
    </>
  );
}
