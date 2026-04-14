
"use client";

export function LogoutButton() {
  return (
    <form action="/api/auth/signout" method="post" className="logoutForm">
      <button type="submit" className="secondaryBtn">
        Cerrar sesión
      </button>
    </form>
  );
}

export default LogoutButton;
