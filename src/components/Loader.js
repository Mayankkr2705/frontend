import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background gap-4">
      <Loader2 className="size-6 animate-spin text-primary" />
      <span className="font-mono text-[10px] text-muted-foreground tracking-[0.4em] uppercase">
        LOADING DATA
      </span>
    </div>
  );
};

export default Loader;