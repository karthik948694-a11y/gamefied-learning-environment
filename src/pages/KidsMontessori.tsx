import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MontessoriKidsLab from "@/components/kids/MontessoriKidsLab";

const KidsMontessori = () => {
  const navigate = useNavigate();

  return (
    <main className="kids-theme min-h-screen bg-background text-foreground pb-12">
      <header className="container mx-auto px-4 pt-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/kids")}
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Kids Zone
        </button>
        <span className="text-sm font-bold text-primary">
          ✨ Montessori Method Workshop
        </span>
      </header>

      <section className="container mx-auto px-4 py-6">
        <MontessoriKidsLab />
      </section>
    </main>
  );
};

export default KidsMontessori;
