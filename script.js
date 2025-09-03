// گرفتن المنت های html
const form = document.getElementById("contact-form") ;
const nameInput = document.getElementById("name") ;
const emailInput = document.getElementById("email") ;
const phoneInput = document.getElementById("phone") ;
const messageInput = document.getElementById("message") ;
const successMsg = document.getElementById("success-msg") ;
const errorMsg = document.getElementById("error-msg") ;

// اعتبارسنجی فرم 
// فرض میکنیم که همه چیز درست است
function validateForm() {
  let valid = true ;
  // نام نباید خالی باشد اگر خالی بود رنگ را قرمز کن و رنگ سبز رو نادیده بگیر همون ولید رو فالس کن 
  if(nameInput.value.trim() === "") {
    nameInput.classList.add("is-invalid") ;
    valid = false ;
    // در غیر این صورت بود یعنی نام وارد شده بود رنگ قرمز رو پاک کن و رنگ سبز رو اضافه کن 
  } else {
    nameInput.classList.remove("is-invalid") ;
    nameInput.classList.add("is-valid") ;
  }
  
  // ایمیل نباید خالی باشد و فرمتش درست باشد 
  // یعنی از اول شروع کن و غیر از فاصله و ادسایم یکی یا بیشتر باید چیزی باشد و غیر از فاصله و ادسایم چیزی باشد مثل نقطه و غیر از فاصله و ادسایم یک دامنه مثل com باشد
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
  // اگر فیلد ایمیل خالی بود یا اینکه با قاعده ی ریجکس هماهنگ نبود تو مقدارش رو بگیر و قرمزش کن و سبز رو فالس 
  if(emailInput.value.trim() === "" || !emailPattern.test(emailInput.value)) {
    emailInput.classList.add("is-invalid") ;
    valid = false ;
    // ولی اگر فیلد ایمیل چیزی نوشته بود و با قاعده ی ریجکس هماهنگ بود رنگ قرمز رو پاک و رنگ سبز رو اضافه کن
  } else {
    emailInput.classList.remove("is-invalid") ;
    emailInput.classList.add("is-valid") ;
  }
  
  // شماره تماس نباید خالی باشد و یا کمتر از ۵ رقم باشد 
  if(phoneInput.value.trim() === "" || phoneInput.value.trim().length < 5) {
    phoneInput.classList.add("is-invalid") ;
    valid = false ;
  } else {
    phoneInput.classList.remove("is-invalid") ;
    phoneInput.classList.add("is-valid") ;
  }
  
  // پیام نباید خالی باشد و حداکثر ۳۰۰ کاراکتر داشته باشد 
  if(messageInput.value.trim() === "" || messageInput.value.trim().length > 300) {
    messageInput.classList.add("is-invalid") ;
    valid = false ;
  } else {
    messageInput.classList.remove("is-invalid") ;
    messageInput.classList.add("is-valid") ;
  }
  
  // نتیجه اعتبارسنجی که ریترنش کن هرچی بود چه درست چه غلط 
  return valid ;
}

function clearForm() {
// بعد از اینکه نتیجه ریترن شد همه فرم رو پاک کن 
nameInput.value = "" ;
emailInput.value = "" ;
phoneInput.value = "" ;
messageInput.value = "" ;

// حذف رنگ سبز و قرمز بعد از اینکه ریترن شد رنگ هارا هم پاک کن 
nameInput.classList.remove("is-invalid" , "is-valid") ;
emailInput.classList.remove("is-invalid" , "is-valid") ;
phoneInput.classList.remove("is-invalid" , "is-valid") ;
messageInput.classList.remove("is-invalid" , "is-valid") ;  
}

// نمایش پیام موفقیت یا خطا با افکت 
function showMessage(msgElement) {
  // در ابتدا پیام موفقیت یا خطا مخفیه یعنی دیسپلی نوون هست که دیسپلی نوون رو حذف میکنیم
  msgElement.classList.remove("d-none") ;
  // و کلاس fade-in رو اضافه میکنیم
  msgElement.classList.add("fade-in") ;
  // و پیام موفقیت یا خطا لعد ۳ ثانیه مخفی شود 
  setTimeout(() => {
    msgElement.classList.add("d-none") ;
    msgElement.classList.remove("fade-in") ;
  } , 3000) ;
}

// کنترل ارسال فرم 
form.addEventListener("submit" , function(e) {
  // جلوگیری از رفرش شدن صفحه 
  e.preventDefault() ;
  
  // اگر هه چیز درست بود پیام موفقیت رو نمایش بده و پیام خطا رو مخفی کن 
  if(validateForm()) {
    // پیام موفقیت رو نمایش بده 
    showMessage(successMsg) ;
    // پیام خطا رو مخفی کن 
    errorMsg.classList.add("d-none") ;
  
  // ساخت شی یا ابجکت جدید برای فرم برای اینکه تمام اطلاعات فرم کاربر رو توش ذخیره بشه 
  const contact = {
    name : nameInput.value ,
    email : emailInput.value ,
    phone : phoneInput.value ,
    message : messageInput.value ,
    // و تاریخ ساعت و دقیقه ای است که فرم ارسال میشه به فارسی 
    date : new Date().toLocaleString("fa-IR" , {hour : "2-digit" , minute : "2-digit"}) 
  } ;
  
  // گرفتن داده های قبلی از لوکال استورج 
  // اینجا چک میکنیم که ایا قبلا داده ای در لوکال استورج به است contacts ذخیره کردیم یا نه اگر ذخیره شده بود که JSON.parse ان را به ارایه تبدیل میکند ولی اگر ذخیره نشده بود یه ارایه خالی میسازیم []تا راحت تر بتونیم اطلاعات جدید اضافه کنیم 
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]") ;
  // شی یا ابجکت جدیدی که ساختیم همون که تاریخ گذاشتیم رو به ارایه اضافه میکنیم 
  contacts.push(contact) ;
  // ارایه کامل با فرم جدید رو دوباره به لوکال استورج میفرستیم و چون لوکال استورج فقط رشته میتونه ذخیره کنه با JSON.stringify ان را به رشته تبدیل میکنیم 
  localStorage.setItem("contacts" , JSON.stringify(contacts)) ;
  
  // بعد از ذخیره فرم رو خالی میکنیم تا کاربر بتونه اطلاعات جدید رو وارد کنه 
  clearForm() ;
  
  // اگر غلط بود پیام خطا رو نمایش بده و پیام موفقیت رو مخفی کن 
  } else {
    showMessage(errorMsg) ;
    successMsg.classList.add("d-none") ;
  }
}) ;
