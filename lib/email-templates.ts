type EmailItem = {
  title: string;
  price: number;
  image: string;
};

type OrderEmailData = {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  total: number;
  items: EmailItem[];
};

type OrderStatusEmailData = {
  orderNumber: string;
  customerName: string;
  status:
    | "order_confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  note?: string;
  trackUrl?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMoney(amount: number) {
  return `₺${amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getStatusLabel(status: OrderStatusEmailData["status"]) {
  switch (status) {
    case "order_confirmed":
      return "Sipariş Onaylandı";

    case "processing":
      return "Hazırlanıyor";

    case "shipped":
      return "Kargoya Verildi";

    case "delivered":
      return "Teslim Edildi";

    case "cancelled":
      return "İptal Edildi";

    default:
      return status;
  }
}

function getStatusMessage(status: OrderStatusEmailData["status"]) {
  switch (status) {
    case "order_confirmed":
      return "Siparişiniz başarıyla alındı ve özenle hazırlanmaya başlandı.";

    case "processing":
      return "Siparişiniz şu anda hazırlanıyor.";

    case "shipped":
      return "Siparişiniz kargoya verildi ve size doğru yola çıktı.";

    case "delivered":
      return "Siparişiniz teslim edildi.";

    case "cancelled":
      return "Siparişiniz iptal edildi. Yardıma ihtiyacınız varsa bu e-postayı yanıtlayabilirsiniz.";

    default:
      return "Sipariş durumunuz güncellendi.";
  }
}

function getItemsHtml(items: EmailItem[]) {
  return items
    .map(
      (item) => `
        <tr>
          <td
            style="
              padding: 16px 0;
              border-bottom: 1px solid #ece7dc;
              width: 88px;
              vertical-align: top;
            "
          >
            <img
              src="${escapeHtml(item.image)}"
              alt="${escapeHtml(item.title)}"
              width="72"
              height="72"
              style="
                display: block;
                width: 72px;
                height: 72px;
                object-fit: cover;
                border-radius: 10px;
                border: 1px solid #e8dfd2;
              "
            />
          </td>

          <td
            style="
              padding: 16px 0 16px 16px;
              border-bottom: 1px solid #ece7dc;
              vertical-align: top;
            "
          >
            <div
              style="
                font-size: 16px;
                line-height: 1.5;
                color: #2a2a2a;
                font-weight: 600;
              "
            >
              ${escapeHtml(item.title)}
            </div>
          </td>

          <td
            style="
              padding: 16px 0 16px 16px;
              border-bottom: 1px solid #ece7dc;
              text-align: right;
              vertical-align: top;
              white-space: nowrap;
            "
          >
            <div
              style="
                font-size: 16px;
                line-height: 1.5;
                color: #2a2a2a;
                font-weight: 700;
              "
            >
              ${formatMoney(item.price)}
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

function getButtonHtml(label: string, href: string) {
  return `
    <div style="margin: 24px 0 0;">
      <a
        href="${escapeHtml(href)}"
        style="
          display: inline-block;
          background: #7a1f1f;
          color: #ffffff;
          text-decoration: none;
          padding: 13px 24px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          line-height: 1;
        "
      >
        ${escapeHtml(label)}
      </a>
    </div>
  `;
}

function getBaseLayout(
  title: string,
  subtitle: string,
  content: string
) {
  return `
    <!DOCTYPE html>
    <html lang="tr">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>${escapeHtml(title)}</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f7f2e8;
          font-family: Arial, Helvetica, sans-serif;
          color: #2a2a2a;
        "
      >
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            background-color: #f7f2e8;
            margin: 0;
            padding: 32px 16px;
          "
        >
          <tr>
            <td align="center">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  max-width: 680px;
                  background-color: #fffdf8;
                  border: 1px solid #eadfce;
                  border-radius: 22px;
                  overflow: hidden;
                  box-shadow: 0 10px 30px rgba(60, 34, 18, 0.08);
                "
              >

                <!-- Header -->
                <tr>
                  <td
                    style="
                      background: #6f1515;
                      padding: 32px 36px;
                    "
                  >
                    <div
                      style="
                        font-size: 13px;
                        letter-spacing: 1.8px;
                        text-transform: uppercase;
                        color: #f6e7d3;
                        font-weight: 700;
                      "
                    >
                      Keramethali
                    </div>

                    <div
                      style="
                        margin-top: 10px;
                        font-size: 32px;
                        line-height: 1.2;
                        color: #ffffff;
                        font-weight: 700;
                      "
                    >
                      ${escapeHtml(title)}
                    </div>

                    <div
                      style="
                        margin-top: 8px;
                        font-size: 15px;
                        line-height: 1.6;
                        color: #f3ddd0;
                      "
                    >
                      ${escapeHtml(subtitle)}
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 36px;">
                    ${content}
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 0 36px 36px;">
                    <div
                      style="
                        padding-top: 18px;
                        border-top: 1px solid #ece7dc;
                        font-size: 13px;
                        line-height: 1.7;
                        color: #6b6258;
                      "
                    >
                      Keramethali<br />
                      Zamansız karaktere sahip el yapımı halılar.
                    </div>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export function getAdminEmailHtml(data: OrderEmailData) {
  const content = `
    <div
      style="
        font-size: 16px;
        line-height: 1.8;
        color: #2a2a2a;
      "
    >
      <p style="margin: 0 0 18px;">
        Mağazanızda yeni bir sipariş oluşturuldu.
      </p>
    </div>

    <!-- Customer / Order Information -->
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        margin: 0 0 28px;
        background-color: #fbf7ef;
        border: 1px solid #ece2d4;
        border-radius: 16px;
      "
    >
      <tr>
        <td style="padding: 22px 24px;">

          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
          >

            <tr>
              <td
                style="
                  padding: 0 0 10px;
                  font-size: 14px;
                  color: #7b6f62;
                "
              >
                Sipariş Numarası
              </td>

              <td
                style="
                  padding: 0 0 10px;
                  font-size: 16px;
                  color: #2a2a2a;
                  font-weight: 700;
                  text-align: right;
                "
              >
                #${escapeHtml(data.orderNumber)}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 10px 0;
                  font-size: 14px;
                  color: #7b6f62;
                "
              >
                Müşteri
              </td>

              <td
                style="
                  padding: 10px 0;
                  font-size: 16px;
                  color: #2a2a2a;
                  font-weight: 600;
                  text-align: right;
                "
              >
                ${escapeHtml(data.customerName)}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 10px 0;
                  font-size: 14px;
                  color: #7b6f62;
                "
              >
                E-posta
              </td>

              <td
                style="
                  padding: 10px 0;
                  font-size: 16px;
                  color: #2a2a2a;
                  text-align: right;
                "
              >
                ${escapeHtml(data.email)}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 10px 0;
                  font-size: 14px;
                  color: #7b6f62;
                "
              >
                Telefon
              </td>

              <td
                style="
                  padding: 10px 0;
                  font-size: 16px;
                  color: #2a2a2a;
                  text-align: right;
                "
              >
                ${escapeHtml(data.phone)}
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

    <!-- Items -->
    <div
      style="
        font-size: 22px;
        line-height: 1.3;
        color: #2a2a2a;
        font-weight: 700;
        margin: 0 0 16px;
      "
    >
      Sipariş Ürünleri
    </div>

    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="margin: 0 0 24px;"
    >
      ${getItemsHtml(data.items)}
    </table>

    <!-- Total -->
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        background-color: #fbf7ef;
        border: 1px solid #ece2d4;
        border-radius: 16px;
      "
    >
      <tr>
        <td
          style="
            padding: 20px 24px;
            font-size: 16px;
            color: #2a2a2a;
          "
        >
          <span style="font-weight: 600;">
            Sipariş Toplamı
          </span>

          <span
            style="
              float: right;
              font-weight: 800;
              font-size: 22px;
              color: #5b0f0f;
            "
          >
            ${formatMoney(data.total)}
          </span>
        </td>
      </tr>
    </table>
  `;

  return getBaseLayout(
    "Yeni Sipariş Alındı",
    "Yeni bir müşteri siparişi oluşturuldu.",
    content
  );
}

export function getCustomerEmailHtml(data: OrderEmailData) {
  const trackUrl =
    "https://keramethali.com/track-order";

  const content = `
    <div
      style="
        font-size: 16px;
        line-height: 1.8;
        color: #2a2a2a;
      "
    >
      <p style="margin: 0 0 14px;">
        Merhaba ${escapeHtml(data.customerName)},
      </p>

      <p style="margin: 0 0 18px;">
        Siparişiniz başarıyla alındı ve şu anda özenle hazırlanıyor.
        Keramethali'deki her parça özenle seçilir ve hazırlanır.
        Siparişiniz ilerledikçe sizi bilgilendirmeye devam edeceğiz.
      </p>
    </div>

    <!-- Order Information -->
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        margin: 0 0 28px;
        background-color: #fbf7ef;
        border: 1px solid #ece2d4;
        border-radius: 16px;
      "
    >
      <tr>
        <td style="padding: 22px 24px;">

          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
          >

            <tr>
              <td
                style="
                  padding: 0 0 10px;
                  font-size: 14px;
                  color: #7b6f62;
                "
              >
                Sipariş Numarası
              </td>

              <td
                style="
                  padding: 0 0 10px;
                  font-size: 16px;
                  color: #2a2a2a;
                  font-weight: 700;
                  text-align: right;
                "
              >
                #${escapeHtml(data.orderNumber)}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 10px 0 0;
                  font-size: 14px;
                  color: #7b6f62;
                "
              >
                İletişim E-postası
              </td>

              <td
                style="
                  padding: 10px 0 0;
                  font-size: 16px;
                  color: #2a2a2a;
                  text-align: right;
                "
              >
                ${escapeHtml(data.email)}
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

    ${getButtonHtml("Siparişinizi Takip Edin", trackUrl)}

    <!-- Items -->
    <div
      style="
        font-size: 22px;
        line-height: 1.3;
        color: #2a2a2a;
        font-weight: 700;
        margin: 28px 0 16px;
      "
    >
      Sipariş Ürünleriniz
    </div>

    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="margin: 0 0 24px;"
    >
      ${getItemsHtml(data.items)}
    </table>

    <!-- Total -->
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        background-color: #fbf7ef;
        border: 1px solid #ece2d4;
        border-radius: 16px;
      "
    >
      <tr>
        <td
          style="
            padding: 20px 24px;
            font-size: 16px;
            color: #2a2a2a;
          "
        >
          <span style="font-weight: 600;">
            Toplam
          </span>

          <span
            style="
              float: right;
              font-weight: 800;
              font-size: 22px;
              color: #5b0f0f;
            "
          >
            ${formatMoney(data.total)}
          </span>
        </td>
      </tr>
    </table>

    <div
      style="
        margin-top: 24px;
        font-size: 15px;
        line-height: 1.8;
        color: #6b6258;
      "
    >
      Siparişiniz hazırlama, kargolama ve teslimat aşamalarından
      geçtikçe sizi tekrar bilgilendireceğiz.
    </div>
  `;

  return getBaseLayout(
    "Sipariş Onaylandı",
    "Keramethali siparişiniz hazırlanıyor",
    content
  );
}

export function getOrderStatusEmailHtml(
  data: OrderStatusEmailData
) {
  const statusLabel = getStatusLabel(data.status);
  const message = getStatusMessage(data.status);

  const trackUrl =
    data.trackUrl ||
    "https://keramethali.com/track-order";

  const noteHtml = data.note
    ? `
      <div
        style="
          margin-top: 18px;
          padding: 16px 18px;
          background-color: #fbf7ef;
          border: 1px solid #ece2d4;
          border-radius: 14px;
        "
      >
        <div
          style="
            font-size: 13px;
            line-height: 1.6;
            color: #7b6f62;
            text-transform: uppercase;
            letter-spacing: 1.3px;
            font-weight: 700;
          "
        >
          Güncelleme Notu
        </div>

        <div
          style="
            margin-top: 8px;
            font-size: 15px;
            line-height: 1.8;
            color: #2a2a2a;
          "
        >
          ${escapeHtml(data.note)}
        </div>
      </div>
    `
    : "";

  const content = `
    <div
      style="
        font-size: 16px;
        line-height: 1.8;
        color: #2a2a2a;
      "
    >
      <p style="margin: 0 0 14px;">
        Merhaba ${escapeHtml(data.customerName)},
      </p>

      <p style="margin: 0 0 18px;">
        ${escapeHtml(message)}
      </p>
    </div>

    <!-- Status -->
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        margin: 0 0 28px;
        background-color: #fbf7ef;
        border: 1px solid #ece2d4;
        border-radius: 16px;
      "
    >
      <tr>
        <td style="padding: 22px 24px;">

          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
          >

            <tr>
              <td
                style="
                  padding: 0 0 10px;
                  font-size: 14px;
                  color: #7b6f62;
                "
              >
                Sipariş Numarası
              </td>

              <td
                style="
                  padding: 0 0 10px;
                  font-size: 16px;
                  color: #2a2a2a;
                  font-weight: 700;
                  text-align: right;
                "
              >
                #${escapeHtml(data.orderNumber)}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 10px 0 0;
                  font-size: 14px;
                  color: #7b6f62;
                "
              >
                Güncel Durum
              </td>

              <td
                style="
                  padding: 10px 0 0;
                  font-size: 16px;
                  color: #5b0f0f;
                  font-weight: 700;
                  text-align: right;
                "
              >
                ${escapeHtml(statusLabel)}
              </td>
            </tr>

          </table>

          ${noteHtml}

        </td>
      </tr>
    </table>

    ${getButtonHtml("Siparişinizi Takip Edin", trackUrl)}

    <div
      style="
        margin-top: 24px;
        font-size: 15px;
        line-height: 1.8;
        color: #6b6258;
      "
    >
      Siparişinizin güncel durumunu istediğiniz zaman
      yukarıdaki butona tıklayarak görüntüleyebilirsiniz.
    </div>
  `;

  return getBaseLayout(
    `Sipariş Güncellemesi: ${statusLabel}`,
    "Keramethali siparişinizin durumu güncellendi",
    content
  );
}
