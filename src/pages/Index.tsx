import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import NowShowingSection from "@/components/home/NowShowingSection";
import ComingSoonSection from "@/components/home/ComingSoonSection";
import FeaturesSection from "@/components/home/FeaturesSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <NowShowingSection />
      <ComingSoonSection />
      <FeaturesSection />
    </Layout>
  );
};

export default Index;
