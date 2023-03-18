import Mustache from "mustache";
import fs from "fs/promises";

test("Menggunakan Mustache test",() =>{
    const data = Mustache.render("Hello {{name}}", {name: "Puy"});
    // Hello Puy
    expect(data).toBe("Hello Puy")
});

test("Menggunakan Mustache Cache",() =>{
    Mustache.parse("Hello {{name}}")
    const data = Mustache.render("Hello {{name}}", {name: "Puy"});
    // Hello Puy
    expect(data).toBe("Hello Puy")
});

test("Tags",() =>{
    const data = Mustache.render("Hello {{name}} my hobby is {{{hobby}}}", {
        name: "Puy",
        hobby: "<b>Programming</b>"
    });
    // Hello Puy
    expect(data).toBe("Hello Puy my hobby is <b>Programming</b>")
});

test("Nested Object",() =>{
    const data = Mustache.render("Hello {{person.name}}", {
        person : {
            name: "Puy"
        }
    });
    // Hello Puy
    expect(data).toBe("Hello Puy")
});

test("Mustache File", async () =>{
    const helloTemplate = await fs.readFile("./templates/hello.mustache")
    .then( data => data.toString());

    const data = Mustache.render(helloTemplate,{
        title: "Ahmad Dzulfikar Fauzi"
    });
    console.info(data);
    expect(data).toContain("Ahmad Dzulfikar Fauzi")
})

test("Section Data ", async () =>{
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then( data => data.toString());

    const data = Mustache.render(helloTemplate,{
        person : {
            name: "Puy"
        }
    });
    console.info(data);
    expect(data).toContain("Puy!")
})

test("Section Data Not Show ", async () =>{
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then( data => data.toString());

    const data = Mustache.render(helloTemplate,{});
    console.info(data);
    expect(data).not.toContain("Hello Person!")
})

test("Section Data Show ", async () =>{
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then( data => data.toString());

    const data = Mustache.render(helloTemplate,{
        person:{
            name:"Puy"
        }
    });
    console.info(data);
    expect(data).toContain("Hello Person")
})

test("Inverted Section", async () =>{
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then( data => data.toString());

    const data = Mustache.render(helloTemplate,{});
    console.info(data);
    expect(data).toContain("Hello Guest")
})

test("List", async ()=>{
    const helloTemplate = await  fs.readFile("./templates/hobbies.mustache")
        .then(data => data .toString());

    const data = Mustache.render(helloTemplate, {
        hobbies : ["Coding", "Gaming","BuyNewStuff", "Reading"]
    });
    console.info(data);
    expect(data).toContain("Coding")
    expect(data).toContain("Gaming")
    expect(data).toContain("BuyNewStuff")
    expect(data).toContain("Reading")
})

test("List Object", async () =>{
    const helloTemplate = await fs.readFile("./templates/students.mustache")
        .then( data => data.toString());

    const data = Mustache.render(helloTemplate,{
        students:[
            { name : "Puy", value:100},
            { name : "Putra", value:50}
        ]
    });
    console.info(data);
    expect(data).toContain("Puy")
    expect(data).toContain("Putra")
    expect(data).toContain("100")
    expect(data).toContain("50")
})

test("Function mengembalikan Function", ()=>{
    const parameter = {
        name :"Puy",
        upper: () =>{
            return (text, render) =>{
                return render(text).toUpperCase();
            }
        }
    }
})

test("Function mengembalikan Function", ()=>{
    const parameter = {
        name :"Puy",
        upper: () =>{
            return (text, render) =>{
                return render(text).toUpperCase();
            }
        }
    }

    const data = Mustache.render("Hello {{#upper}}{{name}}{{/upper}}", parameter);
    console.info(data)
    expect(data).toBe("Hello PUY")
})

test("Comments", async () =>{
    const helloTemplate = await fs.readFile("./templates/comment.mustache")
        .then( data => data.toString());

    const data = Mustache.render(helloTemplate,{title:"Puy"});


    console.info(data);
    expect(data).toContain("Puy")
    expect(data).not.toContain("komentar")
})

test("Partials", async () =>{
    const contentTemplate = await fs.readFile("./templates/content.mustache")
        .then( data => data.toString());
    const headerTemplate = await fs.readFile("./templates/header.mustache")
        .then( data => data.toString());
    const footerTemplate = await fs.readFile("./templates/footer.mustache")
        .then( data => data.toString());


    const data = Mustache.render(contentTemplate,{
        title:"Puy",
        content:"Belajar Mustache JS"
    }, {
        header: headerTemplate,
        footer: footerTemplate
    });


    console.info(data);
    expect(data).toContain("Puy")
    expect(data).toContain("Belajar Mustache JS")
    expect(data).toContain("Powered by Ahmad Dzulfikar Fauzi")

})