import { Scissors } from "lucide-react";

export default function Loading() {
  return (
    <main className="stitch-loader" aria-label="Loading Stitchy Fashion" role="status">
      <div className="loader-grain" />
      <div className="loader-orbit orbit-one" />
      <div className="loader-orbit orbit-two" />

      <div className="loader-stage">
        <div className="loader-thread thread-left" />
        <div className="loader-thread thread-right" />
        <div className="loader-spark spark-one" />
        <div className="loader-spark spark-two" />
        <div className="loader-spark spark-three" />

        <div className="loader-scissors" aria-hidden="true">
          <Scissors size={150} strokeWidth={1.25} />
        </div>

        <div className="loader-label">
          <span className="loader-mark">SF</span>
          <span>Stitchy Fashion</span>
          <span className="loader-dots" aria-hidden="true">...</span>
        </div>
      </div>

      <div className="loader-progress" aria-hidden="true">
        <span />
      </div>
    </main>
  );
}
