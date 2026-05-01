export default function PaymentLogos() {
  return (
    <div className="mt-10 flex justify-center items-center gap-6 opacity-80">

      {/* VISA */}
      <svg
        width="60"
        height="20"
        viewBox="0 0 64 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="15"
          fontSize="14"
          fontWeight="700"
          fill="currentColor"
        >
          VISA
        </text>
      </svg>

      {/* MASTERCARD */}
      <svg
        width="90"
        height="20"
        viewBox="0 0 96 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="8" fill="#EB001B" />
        <circle cx="20" cy="10" r="8" fill="#F79E1B" opacity="0.9" />

        <text
          x="32"
          y="15"
          fontSize="12"
          fontWeight="700"
          fill="currentColor"
        >
          Mastercard
        </text>
      </svg>

    </div>
  );
}
