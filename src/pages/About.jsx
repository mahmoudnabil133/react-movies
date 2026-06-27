import { useI18n } from "../hooks/useStores";

export default function About() {
  const { t } = useI18n();
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">About Our Bookstore</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Welcome to our online bookstore! We are passionate about connecting readers with their next great read.
          Our collection spans across all genres — from fiction and fantasy to science, history, and beyond.
        </p>
        <p>
          Powered by the OpenLibrary API, we provide access to millions of books in our catalog.
          Browse, search, and discover new authors and titles. Save your favorites to your wishlist
          and build your personal reading collection.
        </p>
        <p>
          Happy reading!
        </p>
      </div>
    </div>
  );
}
