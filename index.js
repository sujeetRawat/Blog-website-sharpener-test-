function handleFormSubmit(event){
    event.preventDefault()
    count=count+1;
    const blog = {
        Url: event.target.image.value,
        Title: event.target.title.value,
        Description: event.target.description.value,
        Count: count,
    }
    axios.post("https://crudcrud.com/api/0d5c6faf48e64a94845817f36558132b/blogs",blog)
    .then((response) => {
        showBlogOnScreen(response.data);
    }).catch((error) => {
        document.body.innerHTML += "<h4> Something Went Wrong</h4>"
        console.log(error);
    })
    
    document.getElementById('image').value= "";
    document.getElementById('title').value= "";
    document.getElementById('description').value ="";

    showNewCount(count);
}

document.addEventListener('DOMContentLoaded', function() {
    axios.get("https://crudcrud.com/api/0d5c6faf48e64a94845817f36558132b/blogs")
    .then((response) => {
        for(let i=0; i< response.data.length; i++)
        {
            showBlogOnScreen(response.data[i]);
        }
    })
    .catch((error) => {
        document.body.innerHTML += "<h4> Something Went Wrong</h4>"
        console.log(error);
    })
})

function showBlogOnScreen(blog){

    const blogList = document.createElement("div");
    blogList.innerHTML=`<h3>${blog.Title}</h3><br><img src= ${blog.Url}><br><p>${blog.Description}</p><br>`;
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    blogList.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    blogList.appendChild(editBtn);

    const item = document.querySelector('ul');
    item.appendChild(blogList);

    deleteBtn.addEventListener("click", function (event) {
        item.removeChild(event.target.parentElement);
        axios.delete(`https://crudcrud.com/api/0d5c6faf48e64a94845817f36558132b/blogs/${blog._id}`)
        count--;
        showNewCount(count);
        
    })

    editBtn.addEventListener("click", function (event) {
        item.removeChild(event.target.parentElement);
        axios.delete(`https://crudcrud.com/api/0d5c6faf48e64a94845817f36558132b/blogs/${blog._id}`)
        document.getElementById('image').value = blog.Url;
        document.getElementById('title').value = blog.Title;
        document.getElementById('description').value = blog.Description;
        count--;
        showNewCount(count);
    })
}

let count=0;
const blogCount=document.querySelector('#blogCount');
const newCount=document.createTextNode(count);
blogCount.appendChild(newCount);

function showNewCount(c) {
   blogCount.removeChild(blogCount.lastChild);
    blogCount.appendChild(document.createTextNode(c));

}

