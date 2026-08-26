import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { alternatesFor } from "@/lib/metadata";
import { contact } from "@/lib/content";

/* PLANTILLA — revisar con abogado antes de publicar.
   Los compromisos de disponibilidad, soporte y plazos deben coincidir con
   lo que la landing promete (tres semanas, exportación sin costo, sin
   plazo forzoso) o la página promete algo que el contrato no sostiene. */

export const metadata: Metadata = {
  title: "Términos de servicio",
  description:
    "Condiciones de uso y contratación del sistema AssetBase ERP.",
  alternates: alternatesFor("terms", "es"),
  robots: { index: true, follow: false },
};

export default function Terminos() {
  return (
    <LegalShell lang="es" routeKey="terms" title="Términos de servicio" updated="21 de agosto de 2026">
      <p>
        Estos términos rigen el uso de este sitio y la contratación del
        sistema AssetBase ERP. Al solicitar una demostración o contratar el
        servicio, aceptas lo aquí descrito.
      </p>

      <h2>El servicio</h2>
      <p>
        AssetBase ERP es un sistema de gestión empresarial entregado como
        servicio en la nube. Incluye los módulos contratados en el plan
        correspondiente, la implementación descrita en la propuesta y el
        soporte del plan.
      </p>

      <h2>Implementación</h2>
      <p>
        El plazo de tres semanas descrito en la página aplica a una empresa de
        un solo giro con la información entregada en tiempo y con una persona
        de tu equipo asignada al proyecto. El alcance, las fechas y las
        dependencias se fijan por escrito en el diagnóstico de la semana uno.
        Si tu operación requiere un alcance mayor, se te informa antes de
        firmar.
      </p>

      <h2>Contratación, precios y facturación</h2>
      <p>
        Los precios publicados están expresados en pesos mexicanos y no
        incluyen IVA salvo que se indique lo contrario. La suscripción se
        factura por adelantado según la periodicidad contratada. Los cambios
        de precio se notifican con al menos treinta días de anticipación y
        aplican hasta la siguiente renovación.
      </p>

      <h2>Cancelación</h2>
      <p>
        No hay plazo forzoso. Puedes cancelar la suscripción con aviso previo
        de treinta días naturales. El periodo ya facturado no es reembolsable,
        y el servicio permanece activo hasta el término de ese periodo.
      </p>

      <h2>Tus datos</h2>
      <p>
        La información que cargues o generes en el sistema es tuya. Puedes
        exportarla completa en formatos abiertos en cualquier momento y sin
        costo. Tras la terminación del servicio conservamos una copia durante
        treinta días naturales para permitirte la exportación, y después la
        eliminamos. El tratamiento de datos personales se rige por el{" "}
        <a href="/aviso-de-privacidad">aviso de privacidad</a>.
      </p>

      <h2>Disponibilidad y soporte</h2>
      <p>
        Trabajamos para mantener el servicio disponible de forma continua,
        salvo ventanas de mantenimiento programado que se notifican con
        anticipación. Los tiempos de respuesta de soporte comprometidos son
        los del plan contratado.
      </p>

      <h2>Obligaciones de uso</h2>
      <p>
        Te comprometes a usar el sistema conforme a la ley, a resguardar las
        credenciales de tu equipo y a no intentar vulnerar la seguridad del
        servicio ni acceder a datos de otros clientes.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        AssetBase ERP es una herramienta de gestión: no sustituye la asesoría
        contable, fiscal o legal. La exactitud de la información capturada y
        el cumplimiento de las obligaciones fiscales de tu empresa son tu
        responsabilidad. Nuestra responsabilidad se limita al monto pagado por
        el servicio en los doce meses previos al hecho que la origine.
      </p>

      <h2>Contacto</h2>
      <p>
        Para cualquier duda sobre estos términos, escríbenos a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalShell>
  );
}
