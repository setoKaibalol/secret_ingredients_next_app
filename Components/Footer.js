import React from "react"

function Footer() {
  return (
    <div className="w-full h-20 hidden md:flex border border-t-main-red overflow-hidden">
      <div className="w-5/6 flex flex-row p-4 space-x-4">
        <div>Terms and Conditions</div>
        <div>Kontakt</div>
        <div>Über uns</div>
        <div>AGB&#39;s</div>
        <div>Impressum</div>
      </div>
    </div>
  )
}

export default Footer
