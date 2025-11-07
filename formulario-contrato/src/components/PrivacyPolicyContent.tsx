import React from "react";

export function PrivacyPolicyContent(): JSX.Element {
  return (
    <div className="terms-modal-content">
      <div className="terms-header-notice">
        <strong>POLÍTICA DE PRIVACIDAD DE DATOS DE USO DEL SITIO WEB</strong>
        <p className="legal-reference">Servicios de Inteligencia de Adquisiciones | SYGNODE</p>
      </div>

      {/* 1. IDENTIFICACIÓN Y ALCANCE */}
      <section>
        <h3>1. Identificación y Alcance</h3>

        <h4>Cláusula 1.1. Alcance y Objeto Legal</h4>
        <p>
          Esta política rige el tratamiento de datos personales de todos los visitantes y usuarios que interactúan con el
          Sitio Web. Su cumplimiento es obligatorio conforme a la Ley N° 19.628 sobre Protección de la Vida Privada.
        </p>

        <h4>Cláusula 1.2. Ámbito de Aplicación</h4>
        <p>
          Esta política rige el tratamiento de datos personales de todos los visitantes y usuarios que interactúan con el
          Sitio Web. Su cumplimiento es obligatorio conforme a la Ley N° 19.628 sobre Protección de la Vida Privada.
        </p>
      </section>

      {/* 2. DATOS RECOLECTADOS Y NATURALEZA */}
      <section>
        <h3>2. Datos Recolectados y Naturaleza</h3>
        <p>
          SYGNODE recolecta datos de carácter personal y técnico generados por la interacción del usuario con el Sitio Web:
        </p>

        <div className="table-container">
          <table className="legal-table">
            <thead>
              <tr>
                <th scope="col">Categoría de Datos</th>
                <th scope="col">Origen</th>
                <th scope="col">Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Datos de Navegación</strong></td>
                <td>Uso del Sitio</td>
                <td>Dirección IP, información del dispositivo, navegador, sistema operativo y registros de actividad.</td>
              </tr>
              <tr>
                <td><strong>Datos de Interacción</strong></td>
                <td>Cookies y Tecnologías</td>
                <td>Páginas visitadas, tiempo de permanencia y patrones de navegación.</td>
              </tr>
              <tr>
                <td><strong>Datos de Formulario</strong></td>
                <td>Ingreso a Formulario</td>
                <td>
                  Nombre, correo electrónico, teléfono y cargo, ingresados para contacto, demostración o registro a eventos.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. FINALIDADES DEL TRATAMIENTO Y CONSENTIMIENTO */}
      <section>
        <h3>3. Finalidades del Tratamiento y Consentimiento</h3>
        <p>
          El tratamiento se limita a las siguientes finalidades explícitas, requiriendo el consentimiento del titular cuando corresponda:
        </p>

        <div className="table-container">
          <table className="legal-table">
            <thead>
              <tr>
                <th scope="col">Categoría de Finalidad</th>
                <th scope="col">Datos Utilizados</th>
                <th scope="col">Fundamento de Uso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>3.1. Finalidad Operacional y de Servicio</strong></td>
                <td>Datos de Formulario y de Navegación</td>
                <td>Gestión del contacto y realización de la demostración del servicio solicitada.</td>
              </tr>
              <tr>
                <td><strong>3.2. Finalidad Analítica y Mejora</strong></td>
                <td>Datos de Navegación y de Interacción</td>
                <td>
                  Utilizar la información, previa disociación o anonimización, para el análisis estadístico y la mejora de
                  la experiencia de usuario.
                </td>
              </tr>
              <tr>
                <td><strong>3.3. Finalidad Comercial y Marketing</strong></td>
                <td>Nombre, Cargo, Email y Teléfono</td>
                <td>
                  Envío de newsletters, ofertas, contenidos de valor e invitaciones a webinars y comunicaciones comerciales
                  no esenciales. Requiere la autorización expresa.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. GESTIÓN DE COMUNICACIONES COMERCIALES */}
      <section>
        <h3>4. Gestión de Comunicaciones Comerciales</h3>

        <h4>Cláusula 4.1. Consentimiento Previo para Publicidad</h4>
        <p>
          SYGNODE se abstendrá de enviar comunicaciones promocionales o publicitarias por correo electrónico o cualquier
          otro medio análogo, salvo que el titular de los datos haya otorgado su consentimiento previo, expreso e informado
          para la Finalidad 3.3.
        </p>

        <h4>Cláusula 4.2. Derecho de Exclusión</h4>
        <p>
          Todo mensaje comercial enviado por SYGNODE incluirá un mecanismo expedito, visible y gratuito que permita al
          titular revocar el consentimiento y solicitar la suspensión inmediata del envío de dichas comunicaciones.
        </p>
      </section>

      {/* 5. TRANSFERENCIA, SEGURIDAD Y DERECHOS ARCO */}
      <section>
        <h3>5. Transferencia, Seguridad y Derechos ARCO</h3>

        <h4>Cláusula 5.1. Transferencia y Cesión de Datos</h4>
        <p>
          SYGNODE solo transferirá los datos personales a terceros proveedores para las finalidades que sustentan el
          servicio del Sitio Web. SYGNODE se compromete a que estos terceros mantengan los mismos estándares de seguridad
          aquí establecidos y utilicen los datos exclusivamente para los fines autorizados.
        </p>

        <h4>Cláusula 5.2. Deber de Secreto y Seguridad</h4>
        <p>
          SYGNODE se obliga a adoptar las medidas técnicas y organizativas adecuadas para proteger los datos personales
          contra el acceso o tratamiento no autorizado. SYGNODE formaliza el Deber de Secreto obligando a su personal con
          acceso a los datos mediante la firma de Acuerdos de Confidencialidad.
        </p>

        <h4>Cláusula 5.3. Ejercicio de los Derechos</h4>
        <p>
          El titular de los datos personales podrá ejercer sus derechos de Acceso, Rectificación, Cancelación u Oposición
          al tratamiento de sus datos.
        </p>
        <div className="important-notice">
          <p>
            <strong>Mecanismo:</strong> El ejercicio deberá realizarse mediante el envío de un correo electrónico a la
            casilla de contacto indicada en la Cláusula 6.0.
          </p>
          <p>
            <strong>Plazo:</strong> SYGNODE se compromete a responder y gestionar la solicitud en un plazo máximo de{" "}
            <strong>10 días hábiles</strong> desde la recepción de la misma.
          </p>
        </div>

        <h4>Cláusula 5.4. Vigencia y Modificaciones</h4>
        <p>
          SYGNODE notificará las modificaciones a esta Política con al menos <strong>treinta (30) días de anticipación</strong> a
          su entrada en vigencia, otorgando al Cliente el derecho a revocar su consentimiento y, si corresponde, a terminar
          el Contrato Marco sin penalización.
        </p>
      </section>

      {/* 6. IDENTIFICACIÓN Y CONTACTO LEGAL */}
      <section>
        <h3>6. Identificación y Contacto Legal</h3>

        <h4>Cláusula 6.0. Responsable del Tratamiento y Datos de Contacto</h4>
        <p>
          El responsable del banco de datos es <strong>Compro Chile SpA (SYGNODE)</strong>, Rol Único Tributario (RUT)
          77.758.232-1, con domicilio legal en Jorge Montt 934, Santiago.
        </p>
        <p>
          <strong>Correo Electrónico de Contacto (Para Ejercicio de Derechos): </strong>
          <a href="mailto:operaciones@sygnode.cl">operaciones@sygnode.cl</a>
        </p>
      </section>

      {/* FOOTER INFO */}
      <p className="terms-last-updated">
        <strong>Fecha de Última Actualización:</strong> 7 de noviembre de 2025
        <br />
        <strong>Marco Legal:</strong> Ley N° 19.628 sobre Protección de la Vida Privada (Protección de Datos Personales)
        <br />
        <strong>Responsable:</strong> Compro Chile SpA (SYGNODE)
      </p>
    </div>
  );
}
