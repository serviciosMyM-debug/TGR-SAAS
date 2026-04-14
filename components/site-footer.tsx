
export function SiteFooter() {
  return (
    <footer style={{
      marginTop: "80px",
      paddingTop: "40px",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      textAlign: "center"
    }}>
      <div style={{maxWidth: "1200px", margin: "0 auto", padding: "0 20px"}}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "40px",
          textAlign: "left"
        }}>
          <div>
            <h3>TGR Servicios Eléctricos</h3>
            <p>Instalaciones pensadas para durar, proyectos pensados para crecer.</p>
          </div>

          <div>
            <h4>Contacto</h4>
            <p>tgrelectricidad@gmail.com</p>
            <p>03476-15693368</p>
          </div>

          <div>
            <h4>Enlaces</h4>
            <p>Inicio</p>
            <p>Servicios</p>
            <p>Panel admin</p>
          </div>
        </div>

        {/* FIRMA CON LINK */}
        <div style={{
          width: "100%",
          marginTop: "30px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "center"
        }}>
          <p style={{
            fontSize: "0.95rem",
            color: "#9fb3d9",
            margin: 0
          }}>
            © 2026 Hecho por{" "}
            <a 
              href="https://serviciosmym.com.ar" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color:"#ffd166",
                fontWeight:600,
                textDecoration:"none"
              }}
            >
              Servicios MyM
            </a>
            . Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
