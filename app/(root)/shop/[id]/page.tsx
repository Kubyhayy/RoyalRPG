"use client";
import { getAllOrdersByNick } from '@lib/actions/payer.actions';
import { PayMethods, PurchaseInfo, ShopItems } from '@constants'
import { Payment } from '@constants/Payment';
import { Item } from '@constants/item'
import { PayMethod } from '@constants/payMethod';
import Image from 'next/image';
import React from 'react'



const ShopPage = ({ params }: { params: { id: number } }) => {

  const item = ShopItems[params.id];
  const [selectedVariant, setSelectedVariant] = React.useState<number | null>(null);

  const payment = React.useRef<Payment>(new Payment(item));

  const handleVariantCardChange = (id: number) => {
    setSelectedVariant((prev) => {
      const finalVariant = (prev === id ? null : id)
      payment.current.setItemVariant(finalVariant);
      return finalVariant;
    }
    );
  }

  return (
    <main
      style={{
      }}
      className='pt-40 w-full h-full lg:pb-16 '
    >
      <header className='flex flex-col gap-y-20 max-container items-center max-md:pb-10'>
        <h1 className='text-white font-montserrat text-center text-4xl font-semibold col-span-full'>Wybierz wariant usługi</h1>
        <VariantCards item={item} handleClickedCard={handleVariantCardChange} selected={selectedVariant} />
      </header>
      <Image src={"/shop-section-bottom-background.svg"} width={1600} height={300} className='object-contain mx-auto  md:py-10 lg:py-20' alt='' />
      <MainDataSection payment={payment.current} />

    </main>
  )
}

const VariantCards = ({ item, handleClickedCard, selected }: { item: Item, handleClickedCard: (id: number) => void, selected: number | null }) => {

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
      {item.priceSteps.map((step) => (
        <div
          key={step.id}
          onClick={() => handleClickedCard(step.id)}
          className={`flex flex-col justify-between  border-2 border-grey pt-4 pb-8 px-8 items-center gap-y-6 sm:gap-y-8
           rounded-lg cursor-pointer transition-transform duration-300 ${selected === step.id ? "bg-purple border-purple-dark scale-[115%]" : "hover:scale-105 sm:hover:scale-110"}`}>
          <h1 className={`text-white font-montserrat text-3xl font-semibold`}>
            {item.name.split(" ")[0]}
            <span className='text-grey'>&nbsp;{item.name.substring(item.name.split(" ")[0].length + 1)}</span>
          </h1>
          <span>
            <p className='inline-block font-poppins text-white text-4xl '>{item.priceSteps[step.id].days}</p>
            <p className='inline-block font-poppins text-grey text-3xl'>&nbsp;{(item.priceSteps[step.id].days === 1 ? "DZIEŃ" : "DNI")}</p>
          </span>
          <span>
            <p className='inline-block text-white text-3xl font-poppins'> {String(item.priceSteps[step.id].price).includes(".")
              ? String(item.priceSteps[step.id].price) : String(item.priceSteps[step.id].price) + ".00"}</p>
            <p className='inline-block text-grey text-3xl font-poppins'>&nbsp;ZŁ</p>
          </span>
          <span>
            <p className='inline-block text-white text-3xl font-poppins'> {String(item.priceSteps[step.id].pricePerDay).includes(".")
              ? String(item.priceSteps[step.id].pricePerDay) : String(item.priceSteps[step.id].pricePerDay) + ".00"}</p>
            <p className='inline-block text-grey text-3xl font-poppins'>&nbsp;ZŁ/DZIEŃ</p>
          </span>

        </div>
      ))}
    </div>
  )
}

const MainDataSection = ({ payment }: { payment: Payment }) => {
  const [selectedPayMethod, setSelectedPayMethod] = React.useState<PayMethod | null>(null);
  const [agreed, setAgreed] = React.useState<boolean>(false);
  const invalidDataTextRef = React.useRef<HTMLParagraphElement>(null);

  const handlePayMethodClick = (payMethod: PayMethod) => {
    setSelectedPayMethod((prev) => {
      const finalValue = prev === payMethod ? null : payMethod;
      payment.setPayMethod(finalValue);
      return (
        (prev === payMethod ? null : payMethod)
      )
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (payment.isReady() && agreed) {
      const response = await fetch("/api/tpay/create", { method: "POST", body: JSON.stringify(payment) });
      window.location.href = (await response.json()).redirectLink;
    } else {
      if (invalidDataTextRef?.current)
        invalidDataTextRef.current.style.display = "block";
      if (!payment.getItemVariantID()) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }



  return (
    <section
      className='max-container  bg-black-3 max-sm:rounded-b-none rounded-lg py-16 max-sm:px-2  lg:px-32 flex flex-col  gap-y-10 lg:flex-row items-center justify-around lg:items-start max-sm:pb-28'>
      <article className='flex flex-col gap-y-5 '>
        <Divider />
        <PaymentMethods handleSelectPayMethod={handlePayMethodClick} selectedPayMethod={selectedPayMethod} />
        <Divider />
        <PayerData handleEmailChange={(str) => payment.setEmail(str)} handleNicknameChange={(str) => payment.setNick(str)} />
        <Divider />
        <InputElement handleInputChange={() => { }} header='Kod rabatowy (opcjonalnie)' placeholder='XXX-YYY-ZZZ' size={{ width: 400, height: 45 }} />
      </article>

      <article className='flex flex-col max-w-[350px] sm:max-w-[400px] lg:max-w-[420px] shrink-0 gap-y-7 '>
        <div className='border border-[rgb(41, 44, 46)] rounded-lg px-3 shrink-0 py-5'>
          {PurchaseInfo.map((info, index) => (
            <p key={index} className='text-grey font-poppins text-base first:mt-0 mt-12'>{info}</p>
          ))}
        </div>
        <div className='flex gap-x-6'>
          <button type="button" className={`w-5 h-5 ${agreed ? "bg-green" : "border border-grey blur-[1px]"} rounded-sm cursor-pointer`} onClick={() => { setAgreed((prev) => { payment.setAgreed(!prev); return !prev }); }} />
          <p className='text-white font-poppins text-sm'>Zgadzam się z warunkami umowy.</p>
        </div>

        <form className='w-full' onSubmit={handleSubmit}>
          <button type="submit" className='bg-purple-dark text-center text-white text-3xl font-poppins rounded-lg w-full'>Zakup!</button>
          <p ref={invalidDataTextRef} className='text-red-700 hidden text-center'>Niewłaściwe dane</p>
        </form>
      </article>
    </section>
  )
}

const PaymentMethods = ({ selectedPayMethod, handleSelectPayMethod }: { selectedPayMethod: PayMethod | null, handleSelectPayMethod: (payMethod: PayMethod) => void }) => {

  return (
    <div className='flex flex-col gap-y-6'>
      <h1 className='text-white font-poppins text-2xl sm:text-3xl pl-3'>1. Wybierz metodę płatności</h1>
      {PayMethods.map((method, index) => (
        <div key={method.id} className='flex gap-x-0.5 items-center'>
          <Image src={selectedPayMethod?.id === method.id ? "/circle-checked.svg" : "/circle-unchecked.svg"} alt='' width={15} height={15} className='mr-7 cursor-pointer' draggable={false} onClick={() => { handleSelectPayMethod(method) }} />
          <span
            style={{
              backgroundImage: `url(${method.imageSrc})`,
              backgroundColor: selectedPayMethod?.id === method.id ? "#fff" : "#141617",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            onClick={() => { handleSelectPayMethod(method) }}
            className={`ml-1 first:ml-0 rounded-md w-[70px] h-[30px] cursor-pointer transition-tranform duration-200 ${selectedPayMethod?.id === method.id ? "scale-125" : " hover:scale-110"}`}
          >
          </span>
        </div>
      ))}
    </div>
  )
}


const PayerData = ({ handleNicknameChange, handleEmailChange }: { handleNicknameChange: (nick: string) => void, handleEmailChange: (email: string) => void }) => {
  return (
    <div className='flex flex-col gap-y-8'>
      <h1 className='text-white font-poppins text-3xl pl-3 '>2. Podaj swoje dane</h1>
      <InputElement handleInputChange={(str) => handleNicknameChange(str)} header='Nick z gry' placeholder='Kubyhayy' icon={<Image src={"/skinmc-avatar.png"} width={45} height={45} alt='' className='object-contain rounded-md' />} />
      <InputElement handleInputChange={(str) => handleEmailChange(str)} header='Adres e-mail' placeholder='example@email.com' icon={<Image src="/mail-open-icon.svg" alt='Mail Icon' width={45} height={45} className='object-contain' />} />
    </div>
  )
}

const InputElement = ({ header, icon, placeholder, size, handleInputChange }: { header: string, icon?: React.ReactElement<typeof Image | typeof HTMLSpanElement>, placeholder: string, size?: { width: number, height: number }, handleInputChange: (input: string) => void }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (inputRef?.current)
      inputRef.current.focus();
  }

  return (
    <div className={`flex flex-col gap-y-0.5`}>
      <p className='text-grey font-poppins text-base font-extralight'>{header}</p>
      <div
        onClick={handleClick}
        className={`${size ? `w-[${size.width}px] h-[${size.height}px]` : "w-[400px] h-20"} border border-grey rounded-md flex py-5 gap-x-3 pl-3 items-center max-sm:w-full cursor-text`}>
        {icon}
        <input
          ref={inputRef}
          onChange={(e) => handleInputChange(e.target.value)}
          type='text' placeholder={placeholder} className='bg-transparent placeholder:text-grey placeholder:font-light placeholder:font-poppins
        text-xl font-poppins text-white focus:outline-none w-full' />
      </div>
    </div>
  )
}

const Divider = () => {
  return (
    <span className='h-[1px] w-full  bg-purple-dark max-w-md rounded-full first:mt-0 mt-5' />
  )
}



export default ShopPage