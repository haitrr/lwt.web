export const metadata = { title: 'Reading' };

// TODO: port from lwt.web master: src/Components/Pages/TextReadPage
export default async function TextReadPage({ params }: PageProps<'/text/read/[textId]'>) {
  const { textId } = await params;
  return <h1>Reading text {textId}</h1>;
}
