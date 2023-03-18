import Mustache from "mustache";

test("Menggunakan Mustache test",() =>{
    const data = Mustache.render("Hello {{name}}", {name: "Puy"});
    // Hello Puy
    expect(data).toBe("Hello Puy")
});

test("Menggunakan Mustache test",() =>{
    const data = Mustache.render("Hello {{name}}", {name: "Puy"});
    // Hello Puy
    expect(data).toBe("Hello Puy")
});