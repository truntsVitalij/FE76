type SuccessLoginPageProps = {
    setPage: ( value: "login" | "success" | "blog") => void;
};

export const SuccessLoginPage = ({setPage,} : SuccessLoginPageProps ) => {
    return (
        <>
        <h3> You are loggin in! </h3>
        <button onClick={() => setPage("blog")}> Go to blog </button>
        </>
    )

}