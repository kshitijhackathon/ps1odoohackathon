export function LoadingSpinner() {
  return (
    <div className="loading-overlay active" id="loadingOverlay">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-muted border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Please wait...</p>
      </div>
    </div>
  );
}
