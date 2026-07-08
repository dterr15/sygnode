# Playbook AEO/SEO — SYGNODE

Cómo mantener a SYGNODE apareciendo en las respuestas de ChatGPT, Gemini, Claude y Perplexity, y en los resultados de Google. Basado en el framework de Ethan Smith (Graphite): los LLMs resumen citaciones vía RAG — ganas apareciendo en la mayor cantidad de citaciones posible, y respondiendo el long tail de preguntas que nadie más responde.

## Estado on-site (ya implementado)

- Schema FAQPage espejando todas las preguntas visibles en cada página (42 preguntas en total).
- Schema Service, Organization, BreadcrumbList en subpáginas de energía.
- `robots.txt` permite crawlers de IA (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, etc.).
- `llms.txt` en la raíz con resumen de la firma y todos los servicios.
- Cross-links entre las 9 verticales en el footer de todas las páginas.
- Sitemap con lastmod actualizado.

**Regla de mantenimiento**: cada vez que agregues o cambies una FAQ visible, actualiza el bloque JSON-LD de esa página para que la refleje, y actualiza el `lastmod` de esa URL en `sitemap.xml`. Si agregas un servicio nuevo, agrégalo a `llms.txt`, al footer y al OfferCatalog de `index.html`.

## Rutina mensual: tracking de share of voice

1. Mantén una lista de ~40-60 preguntas objetivo (las de las FAQs del sitio son el punto de partida; agrega variantes).
2. Una vez al mes, pregunta cada una en ChatGPT, Gemini y Perplexity (las respuestas varían por corrida — haz 2-3 corridas por pregunta).
3. Registra en una planilla: ¿aparece SYGNODE? ¿en qué posición? ¿qué sitios aparecen como citaciones?
4. Métricas: % de preguntas donde apareces (share of voice) y posición promedio.
5. Cuando quieras escalar: usa una herramienta de answer tracking (hay decenas; elige la más barata que haga lo que necesitas — es un commodity, no pagues premium).
6. Los sitios que aparecen como citaciones y no son tuyos = tu lista de objetivos off-site.

**Importante para B2B**: el tráfico LLM casi no se ve en analytics (la gente abre otra pestaña y busca la marca en Google, o entra directo). Agrega "¿Cómo nos conociste?" en el formulario de contacto — es la única medición confiable.

## Off-site: donde se gana el juego

El LLM resume muchas citaciones. Estar #1 en Google no basta; hay que estar mencionado en la mayor cantidad de fuentes posible.

1. **Reddit y foros** (el más citado por LLMs): participa con tu cuenta real. Formato: "Soy Daniel, fundador de SYGNODE" + respuesta genuinamente útil. Subreddits y foros de energía, minería, mantenimiento industrial, derecho. **Nunca** cuentas falsas ni auto-upvotes — los banean y destruye la señal. Con 5 comentarios buenos por mes alcanza.
2. **YouTube** (citado fuerte y con poquísima competencia B2B): nadie hace videos sobre "cómo prevenir fallas en cascada en el SEN" o "peritaje técnico para arbitraje ICC". Un video simple (pantalla + voz, 5-10 min) por pregunta de alto valor puede convertirte en la única citación en video. Prioriza las preguntas de las FAQs de litigios e infraestructura energética.
3. **LinkedIn + estudios originales**: publica análisis con datos propios (ej: patrones del blackout de Chile 2025, tiempos reales de conexión al SEN). El contenido con "information gain" (algo que nadie más dijo) es lo que los algoritmos premian y lo que otros blogs citan.
4. **Prensa y medios sectoriales chilenos**: Diario Financiero, Electricidad (revistaei.cl), Minería Chilena, portales legales. Una mención en un medio establecido vale mucho como citación. Ofrece columnas técnicas de opinión.
5. **Directorios y listículos B2B**: cuando busques "mejores consultoras de riesgo operacional Chile" en un LLM, mira qué listas cita y gestiona aparecer en ellas.

**Ventaja de firma chica**: en Google necesitas años de domain authority; en AEO una mención en un thread de Reddit o un video puede citarte mañana. El long tail (preguntas ultra-específicas que nadie responde) es donde SYGNODE puede ser la única citación.

## Experimentos: no confíes en "best practices"

La mayoría de los consejos AEO publicados no están validados. Valida tú mismo:

1. Toma tus preguntas objetivo y divídelas: 50% control (no hacer nada), 50% test.
2. Mide share of voice 2 semanas antes de intervenir.
3. Interviene solo el grupo test (ej: comentarios en Reddit para esas preguntas, o un video de YouTube).
4. Mide 2-4 semanas después. Si el test subió y el control no, la táctica funciona — repítela y verifica que se reproduce.
5. Duplica lo que funciona, abandona lo que no.

## Contenido nuevo: de dónde salen las preguntas

- **Llamadas de venta y correos de prospectos**: cada pregunta que te hace un cliente es una pregunta que alguien le hace a ChatGPT. Agrégala como FAQ a la vertical correspondiente (visible + schema).
- **Keywords de competidores**: toma los términos por los que pujan consultoras de riesgo/peritaje y conviértelos en preguntas (un LLM te ayuda a transformarlos).
- **Regla de calidad**: solo contenido con information gain — experiencia real, datos propios, criterio técnico específico. Contenido 100% generado por IA sin edición no funciona (≈90% de lo que rankea es contenido humano o IA-asistido editado). IA como asistente de redacción: sí. IA como autor sin revisión: no.

## Qué NO hacer

- Cuentas falsas o spam en Reddit (baneo + daño de marca).
- Contenido IA masivo sin edición humana.
- Keyword stuffing o FAQs en schema que no existen visibles en la página (Google lo penaliza como schema engañoso).
- Bloquear crawlers de IA en robots.txt (si no te indexan, no existes en las respuestas; tus competidores sí van a estar).

## Checklist técnico trimestral

- [ ] Verificar schema con https://validator.schema.org y https://search.google.com/test/rich-results
- [ ] Google Search Console: cobertura de indexación, queries que crecen, errores
- [ ] Verificar que robots.txt y sitemap.xml siguen accesibles en producción
- [ ] Revisar que ninguna página nueva quedó fuera del sitemap, del footer y de llms.txt
- [ ] Correr el tracking de share of voice y comparar contra el trimestre anterior
