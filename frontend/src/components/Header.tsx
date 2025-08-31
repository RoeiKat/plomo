export function Header() {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center justify-between ">
          <img
            className="m-1 p-1"
            style={{ width: "48px", height: "48px" }}
            src="https://res.cloudinary.com/dm20uwmki/image/upload/v1756297746/logo-plomo-150x150_cy9i9m.svg"
            alt="plomoLogo"
          />
          <h1 className="text-xl font-semibold tracking-tight">
            {/* plomo • Kanban */}
            Plomo
          </h1>
        </div>
        <div className="text-sm text-slate-500">
          Dummy data • Browser Caching • Kanban
        </div>
      </div>
    </header>
  );
}
