import { getCollection } from "astro:content";
import JSZip from "jszip";

export async function GET() {
  try {
    const zines = await getCollection("zines");
    const zinesWithPdfs = zines
      .filter((zine) => zine.data.pdfUrl)
      .map((zine) => ({
        url: zine.data.pdfUrl!,
        title: zine.data.title,
        slug: zine.data.slug || zine.id,
      }));

    if (zinesWithPdfs.length === 0) {
      return new Response(JSON.stringify({ error: "No PDFs found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const zip = new JSZip();
    let successCount = 0;
    const errors: string[] = [];

    // fetch each PDF and add to zip
    await Promise.all(
      zinesWithPdfs.map(async (zine) => {
        try {
          const response = await fetch(zine.url);
          if (!response.ok) {
            const errorMsg = `Failed to fetch ${zine.title}: HTTP ${response.status}`;
            console.error(errorMsg);
            errors.push(errorMsg);
            return;
          }
          const arrayBuffer = await response.arrayBuffer();
          if (arrayBuffer.byteLength === 0) {
            const errorMsg = `Empty response for ${zine.title}`;
            console.error(errorMsg);
            errors.push(errorMsg);
            return;
          }
          const filename = `${zine.slug}.pdf`;
          zip.file(filename, arrayBuffer);
          successCount++;
        } catch (error) {
          const errorMsg = `Error fetching ${zine.title}: ${error instanceof Error ? error.message : String(error)}`;
          console.error(errorMsg);
          errors.push(errorMsg);
        }
      }),
    );

    // check if any files were added
    if (successCount === 0) {
      return new Response(
        JSON.stringify({
          error: "No files could be fetched",
          details: errors,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // generate zip file
    const zipBlob = await zip.generateAsync({ type: "nodebuffer" });

    return new Response(zipBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="zines.zip"',
      },
    });
  } catch (error) {
    console.error("Error creating zip:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create zip file",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
