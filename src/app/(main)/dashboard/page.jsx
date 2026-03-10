import {getUserJournalEntries} from "@/actions/journal.action";
import Collections from "./_components/Collections";
import {getCollections} from "@/actions/collection.action";

const Dashboard = async () => {
  const {data: journals} = await getUserJournalEntries();
  const {data: collections} = await getCollections();

  const entryByCollection = journals?.reduce((acc, entry) => {
    const collectionId = entry?.collectionId || "unorganized";

    if (!acc[collectionId]) {
      acc[collectionId] = [];
    }

    acc[collectionId]?.push(entry);

    return acc;
  }, {});



  return (
    <div>
      <Collections
        entries={entryByCollection}
        collections={collections || []}
      />
    </div>
  );
};
export default Dashboard;
