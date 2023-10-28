import "./loader-styles.css";
export default function FormAction({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
  loader
}) {
  
  return (
    <>
      {type === "Button" ? (
        <div className="flex">
          <button
            type={action}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onSubmit={handleSubmit}
          >
            {loader && (
              <div
                id="loader"
                className="loader relative mr-10 border-b-black "
              ></div>
            )}
            {text}
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
