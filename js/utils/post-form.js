import { setBackGroundImg, setFeildValue, setTextContent } from "./common";
import * as yup from "yup";

function renderPostForm(form , defaultValue) {
    setFeildValue(form , '[name="title"]' , defaultValue?.title);
    setFeildValue(form , '[name="author"]' , defaultValue?.author);
    setFeildValue(form , '[name="description"]' , defaultValue?.description);
    setFeildValue(form , '[name="imageUrl"]' , defaultValue?.imageUrl);

    setBackGroundImg(document , '#postHeroImage' , defaultValue?.imageUrl);
}

function getFromValue(postForm) {
    const formValue = {};
    // ['title' , 'author' , 'description' , 'imageUrl'].forEach((name) => {
    //     const field = postForm.querySelector(`[name="${name}"]`);
    //     if(field) formValue[name] =  field.value;
    // });

    const formdataList =  new FormData(postForm); 
    for (const [key , value] of formdataList) {
        formValue[key] = value;
    }

    return formValue;
}

function getFormRule() {
    return yup.object().shape({
        title: yup.string().required('please enter title'),
        author: yup.string().required('please enter author').test(
            'at-least-2-words',
            'please enter at least two words',
            (value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 2
        ),
        description: yup.string(),
        imageUrl: yup.required.string('please enter the url image').url('please enter the url image')
    })
}

function setFieldError(postForm , fieldName , message) {
    const element = postForm.querySelector(`[name="${fieldName}"]`);
    if(element) {
        element.setCustomValidity(message);
        setTextContent(element.parentElement , '.invalid-feedback', message);
    }
}

async function validateForm(postForm , formValue) {
    try {
        ['title' , 'author' , 'imageUrl'].forEach(name => setFieldError(postForm, name , ''));

        const formRules = getFormRule();
        await  formRules.validate(formValue , {abortEarly:false});
    } catch (error) {
        const errorLog = {};

        if(error.name == 'ValidationError' && Array.isArray(error.inner)) {

            for (const validationError of error.inner) {
                const name = validationError.path;

                if(errorLog[name]) continue;

                setFieldError(postForm , name , validationError.message);
                
                errorLog[name] = true;          
            }
        }
    }

    const isValid = postForm.checkValidity();
    if(!isValid) postForm.classList.add('was-validated');
    
    return isValid;
}

function showLoading() {
    const button = document.querySelector('[name="submit"]');
    if(button) {
        button.disabled = true;
        button.textContent = 'Saving';
    }
}
function hideLoading() {
    const button = document.querySelector('[name="submit"]');
    if(button) {
        button.disabled = false;
        button.textContent = 'Save';
    }
}

function initEventRandomImg(form) {

    const buttonRandom = document.getElementById('postChangeImage');
    if(buttonRandom) {
        buttonRandom.addEventListener('click' , () => {

            let url = `https://picsum.photos/id/${Math.round(Math.random()*1000)}/1369/400`;


            setFeildValue(form , '[name="imageUrl"]' , url);

            setBackGroundImg(document , '#postHeroImage' , url);
        })
    }
}

export function initPostForm({ postFromId , defaultValue , onChange }) {

    const postForm = document.getElementById(postFromId)
    
    if(!postForm) return;
    
    initEventRandomImg(postForm);

    // console.log(defaultValue);

    let submitting = false;

    renderPostForm(postForm, defaultValue);
    
    postForm.addEventListener('submit' , async (e) => {
        e.preventDefault();

        if(submitting) return;


        submitting = true;
        showLoading();

        const formValue = getFromValue(postForm);
        formValue.id = defaultValue.id;

        const isValid  =  await validateForm(postForm , formValue);
        if(isValid) await onChange?.(formValue);   

        hideLoading();
        submitting = false;
    })
}