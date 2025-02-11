function deleteProduct(productID) {
    var URL = window.location.origin;

    console.log(URL);

    fetch(`${URL}/api/products`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productID }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log({ data });
            window.location.href = URL;
        })
        .catch((e) => console.log(e));
}