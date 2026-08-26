import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { alternatesFor } from "@/lib/metadata";
import { contact, getContent } from "@/lib/content";

/* PLANTILLA — revisar con abogado antes de publicar.
   La LFPDPPP obliga a un aviso de privacidad porque el formulario de demo
   recaba datos personales. Los datos del responsable (razón social,
   domicilio fiscal, RFC) deben ser los reales. */

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Cómo AssetBase ERP recaba, usa y protege tus datos personales conforme a la LFPDPPP.",
  alternates: alternatesFor("privacy", "es"),
  robots: { index: true, follow: false },
};

export default function AvisoDePrivacidad() {
  const t = getContent("es");

  return (
    <LegalShell lang="es" routeKey="privacy" title="Aviso de privacidad" updated="21 de agosto de 2026">
      <p>
        En cumplimiento de la Ley Federal de Protección de Datos Personales en
        Posesión de los Particulares (LFPDPPP), su Reglamento y los
        Lineamientos del Aviso de Privacidad, AssetBase ERP pone a tu
        disposición el presente aviso.
      </p>

      <h2>Responsable del tratamiento</h2>
      <p>
        AssetBase ERP, con domicilio en {t.contact.city}, es responsable del
        tratamiento de los datos personales que nos proporciones. Para
        cualquier asunto relacionado con este aviso puedes escribir a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>Datos que recabamos</h2>
      <p>
        A través del formulario de solicitud de demo recabamos únicamente
        datos de identificación y contacto:
      </p>
      <ul>
        <li>Nombre</li>
        <li>Empresa o razón social</li>
        <li>Correo electrónico</li>
        <li>Teléfono o número de WhatsApp (opcional)</li>
        <li>Número aproximado de personas que usarían el sistema</li>
      </ul>
      <p>
        No recabamos datos personales sensibles, ni datos financieros o
        patrimoniales, a través de este sitio.
      </p>

      <h2>Finalidades del tratamiento</h2>
      <p>Finalidades primarias, necesarias para atender tu solicitud:</p>
      <ul>
        <li>Contactarte para agendar y realizar la demostración del sistema.</li>
        <li>Elaborar y enviarte una propuesta comercial.</li>
        <li>Dar seguimiento a tus preguntas sobre el producto.</li>
      </ul>
      <p>Finalidades secundarias, que puedes rechazar sin afectar lo anterior:</p>
      <ul>
        <li>Enviarte comunicaciones sobre nuevas funciones del producto.</li>
        <li>Invitarte a webinars o materiales informativos.</li>
      </ul>
      <p>
        Para negarte a las finalidades secundarias, escríbenos a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> en cualquier
        momento.
      </p>

      <h2>Transferencias</h2>
      <p>
        No vendemos ni comercializamos tus datos personales. Podemos
        compartirlos con proveedores que nos prestan servicios de
        infraestructura, correo electrónico y gestión de relaciones con
        clientes, exclusivamente para las finalidades descritas y bajo
        obligaciones contractuales de confidencialidad.
      </p>

      <h2>Derechos ARCO</h2>
      <p>
        Puedes ejercer en cualquier momento tus derechos de Acceso,
        Rectificación, Cancelación y Oposición, así como revocar tu
        consentimiento, enviando tu solicitud a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. La solicitud
        debe incluir tu nombre, un medio para comunicarte la respuesta, los
        documentos que acrediten tu identidad y la descripción clara de los
        datos sobre los que buscas ejercer el derecho. Responderemos en un
        plazo máximo de veinte días hábiles.
      </p>

      <h2>Conservación de los datos</h2>
      <p>
        Conservamos tus datos mientras exista una relación comercial o una
        oportunidad activa, y hasta por veinticuatro meses después del último
        contacto, salvo obligación legal de conservarlos por más tiempo.
      </p>

      <h2>Cookies y tecnologías similares</h2>
      <p>
        Este sitio utiliza <strong>Google Analytics 4</strong> para entender
        cómo se navega la página: qué secciones se leen, desde dónde llega
        la gente y qué tanto se usa el formulario de demo. No usamos cookies
        de publicidad ni de seguimiento entre sitios, y no construimos
        perfiles individuales.
      </p>
      <p>
        Las cookies de analítica <strong>no se instalan hasta que las
        aceptas</strong> en la banda que aparece al entrar. Si las rechazas,
        la página funciona igual y no se guarda ninguna cookie de medición.
        Puedes cambiar de opinión en cualquier momento borrando los datos de
        este sitio en tu navegador: la banda volverá a preguntarte.
      </p>
      <p>
        También usamos almacenamiento local del navegador para recordar esa
        decisión. Ese dato no sale de tu equipo y no lo asociamos contigo.
      </p>
      <p>
        Google actúa como encargado del tratamiento y puede procesar la
        información fuera de México. Puedes consultar sus prácticas en la{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          política de privacidad de Google
        </a>{" "}
        e instalar su{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          complemento de inhabilitación
        </a>{" "}
        si prefieres bloquearlo en todos los sitios.
      </p>

      <h2>Cambios al aviso</h2>
      <p>
        Cualquier modificación a este aviso se publicará en esta misma página,
        indicando la fecha de la última actualización.
      </p>
    </LegalShell>
  );
}
