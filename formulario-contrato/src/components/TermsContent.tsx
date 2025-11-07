import React from "react";

export function TermsContent(): JSX.Element {
  return (
    <div className="terms-modal-content">
      <div className="terms-header-notice">
        <strong>TÉRMINOS Y CONDICIONES DE USO DEL SITIO WEB</strong>
        <p>Servicios de Inteligencia de Adquisiciones | SYGNODE</p>
      </div>

      <div className="important-notice">
        <strong>Importante:</strong>
        <p>
          La aceptación digital de estos Términos y Condiciones (T&amp;C) es un requisito
          previo para la formalización del Contrato Marco de Servicios de Inteligencia de Adquisiciones.
        </p>
      </div>

      {/* 1. NATURALEZA Y VÍNCULO CONTRACTUAL */}
      <section>
        <h3>1. NATURALEZA Y VÍNCULO CONTRACTUAL</h3>

        <h4>CLÁUSULA 1.1. NATURALEZA EXCLUSIVAMENTE B2B</h4>
        <p>
          El Cliente (Persona Jurídica o Natural en su representación) declara y garantiza que
          contrata el acceso al sitio web y la provisión del servicio exclusivamente para fines
          profesionales, comerciales y empresariales. El Cliente no actúa en calidad de consumidor
          final de conformidad con el Art. 1°, N° 1 de la Ley N° 19.496.
        </p>

        <h4>CLÁUSULA 1.2. NATURALEZA MERCANTIL</h4>
        <p>
          La contratación se verifica en un contexto <strong>Business to Business (B2B)</strong>.
          El Cliente declara que los bienes o servicios adquiridos mediante la inteligencia de
          adquisiciones tienen por objeto ser vendidos, permutados o incorporados a su cadena
          productiva, conforme al Art. 3° del Código de Comercio. La relación contractual se
          regirá exclusivamente por el Código de Comercio y el Código Civil.
        </p>

        <h4>CLÁUSULA 1.3. EXCLUSIÓN DEL DERECHO A RETRACTO</h4>
        <p>
          Como consecuencia directa de la naturaleza B2B del servicio y la exclusión de la
          calidad de consumidor final, el Cliente declara conocer y aceptar que no le asiste el
          Derecho a Retracto establecido en el artículo 3° Bis de la Ley N° 19.496.
        </p>
      </section>

      {/* 2. FORMACIÓN DEL CONSENTIMIENTO */}
      <section>
        <h3>2. FORMACIÓN DEL CONSENTIMIENTO</h3>

        <h4>CLÁUSULA 2.1. ETAPAS DEL CONSENTIMIENTO Y PERFECCIONAMIENTO</h4>
        <p>
          El consentimiento del Cliente para adherir a estos T&amp;C se entenderá perfeccionado
          una vez que haya completado las siguientes etapas:
        </p>
        <ol>
          <li>Aceptación Expresa de estos T&amp;C mediante Checkbox no pre-marcado.</li>
          <li>Solicitud formal de inicio de la contratación.</li>
          <li>Recepción de la aceptación de la solicitud por parte de SYGNODE, mediante correo electrónico.</li>
        </ol>

        <h4>CLÁUSULA 2.2. REQUISITO VINCULANTE</h4>
        <p>
          La aceptación de estos T&amp;C es un requisito esencial para la formalización y validez
          del Contrato Marco de Servicios de Inteligencia de Adquisiciones.
        </p>
      </section>

      {/* 3. ALCANCE DE LA RESPONSABILIDAD Y ASESORÍA */}
      <section>
        <h3>3. ALCANCE DE LA RESPONSABILIDAD Y ASESORÍA</h3>

        <h4>CLÁUSULA 3.1. OBLIGACIÓN DE MEDIOS Y ESTÁNDAR DE DILIGENCIA</h4>
        <p>
          SYGNODE declara que su obligación, incluyendo la información y asesoría precontractual,
          es de medios o diligencia profesional, y no de resultado. SYGNODE se compromete únicamente
          a aplicar la máxima diligencia y cuidado, conforme al estándar del buen comerciante y del
          buen padre de familia (culpa leve) (Art. 1547 C.C.).
        </p>

        <h4>CLÁUSULA 3.2. EXCLUSIÓN DE RESPONSABILIDAD POR RIESGO DE MERCADO</h4>
        <p>
          SYGNODE no garantiza resultados finales (ej. ahorro, precio más bajo, disponibilidad de stock).
          SYGNODE no será responsable por pérdidas, daños o perjuicios que provengan de factores ajenos a su
          control o de la ejecución defectuosa de las recomendaciones por parte del Cliente.
        </p>

        <h4>CLÁUSULA 3.3. LÍMITE PATRIMONIAL Y REMISIÓN</h4>
        <p>
          Los límites de responsabilidad patrimonial y el tope máximo de indemnización por incumplimiento
          se regirán exclusivamente por las cláusulas establecidas en el Contrato Marco de Servicios de
          Inteligencia de Adquisiciones.
        </p>

        <h4>CLÁUSULA 3.4. GESTIÓN DE FALLO OPERACIONAL</h4>
        <p>
          Se considerará una Deficiencia Operacional únicamente la entrega incompleta de reportes o la
          indisponibilidad no programada de la plataforma. La respuesta y gestión de solución se realizará
          por escrito, con una pauta de solución entregada en un plazo máximo de <strong>24 horas hábiles</strong>.
        </p>
      </section>

      {/* 4. VALIDEZ GENERAL, INTERPRETACIÓN Y JURISDICCIÓN */}
      <section>
        <h3>4. VALIDEZ GENERAL, INTERPRETACIÓN Y JURISDICCIÓN</h3>

        <h4>CLÁUSULA 4.1. LEY APLICABLE Y JURISDICCIÓN</h4>
        <p>
          Estos T&amp;C se rigen íntegra y exclusivamente por las leyes de la República de Chile.
          Para la resolución de cualquier controversia, las Partes, con renuncia expresa a cualquier
          otro fuero, prorrogan competencia ante los Tribunales Ordinarios de Justicia de la comuna
          y ciudad de <strong>Santiago de Chile</strong>.
        </p>

        <h4>CLÁUSULA 4.2. REGLAS DE INTERPRETACIÓN</h4>
        <p>
          Estos T&amp;C se interpretarán siempre con el fin de reflejar la intención B2B y profesional de
          las partes, de conformidad con el Artículo 1560 del Código Civil. En caso de ambigüedad, la
          interpretación que mejor salvaguarde la naturaleza de obligación de medios y el fin estratégico
          del servicio prevalecerá.
        </p>

        <h4>CLÁUSULA 4.3. INTEGRIDAD Y NULIDAD PARCIAL</h4>
        <p>
          Estos T&amp;C, junto con el Contrato Marco y sus Anexos, constituyen la totalidad del acuerdo.
          La eventual declaración de nulidad de alguna cláusula no afectará la validez de las demás
          disposiciones.
        </p>
      </section>

      {/* 5. IDENTIFICACIÓN Y CONTACTO LEGAL */}
      <section>
        <h3>5. IDENTIFICACIÓN Y CONTACTO LEGAL</h3>

        <h4>CLÁUSULA 5.0. PROVEEDOR Y RESPONSABLE DEL SERVICIO</h4>
        <p>
          El servicio es prestado por <strong>Compro Chile SpA (SYGNODE)</strong>, Rol Único Tributario (RUT)
          77.758.232-1, con domicilio legal en <strong>Jorge Montt 934, Punta Arenas</strong>. Todas las
          comunicaciones, notificaciones y requerimientos legales deben dirigirse al domicilio o a la casilla
          de correo electrónico de contacto indicada en el Sitio Web.
        </p>
      </section>

      {/* FOOTER / FECHA */}
      <p className="terms-last-updated">
        <strong>Fecha de Última Actualización:</strong> 7 de noviembre de 2025
      </p>
    </div>
  );
}
