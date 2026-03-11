import CollectionFolder from "./CollectionFolder";
import CreateCollectionFolder from "./CreateNewCollection";

const Collections = ({collections, entries}) => {
  return (
    <div className="min-h-screen max-w-6xl my-10 mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-5">
        <h1 className="font-serif text-xl md:text-3xl font-light text-foreground">
          My <span className="italic text-primary">Collections</span>
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 items-start sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <CreateCollectionFolder />
        <CollectionFolder name={"Unorganized"} entries={entries?.unorganized} />
        {collections?.map((collection) => {
          return (
            <CollectionFolder
              key={collection?._id}
              collection={collection}
              name={collection?.name}
              entries={entries[collection?._id]}
            />
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Collections;
