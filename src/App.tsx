import { useState } from 'react'
import { config } from './config'

function hasText(value: string | undefined | null): boolean {
  return Boolean(value?.trim())
}

function isPlaceholder(value: string): boolean {
  const trimmed = value.trim()
  return trimmed.startsWith('[') && trimmed.endsWith(']')
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fallback abaixo
  }

  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    ta.style.top = '0'
    document.body.appendChild(ta)
    ta.select()
    ta.setSelectionRange(0, text.length)
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 fill-current">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 fill-current">
      <path d="M4 6.5A1.5 1.5 0 015.5 5h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 014 6.5zm0 5.5A1.5 1.5 0 015.5 10.5h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 014 12zm0 5.5A1.5 1.5 0 015.5 16h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 014 17.5z" />
    </svg>
  )
}

export default function App() {
  const [copied, setCopied] = useState(false)

  const wifiRede = hasText(config.wifi.rede) ? config.wifi.rede.trim() : ''
  const wifiSenha = hasText(config.wifi.senha) ? config.wifi.senha.trim() : ''
  const showWifi = Boolean(wifiRede || wifiSenha)

  const horarios = config.horarios.map((h) => h.trim()).filter(Boolean)
  const showHorarios = horarios.length > 0

  const endereco = hasText(config.endereco) ? config.endereco.trim() : ''
  const whatsappDigits = config.whatsapp.replace(/\D/g, '')
  const showWhatsapp =
    hasText(config.whatsapp) &&
    !isPlaceholder(config.whatsapp) &&
    whatsappDigits.length >= 10
  const showInstagram =
    hasText(config.instagram) && !isPlaceholder(config.instagram)

  const aviso = hasText(config.aviso) ? config.aviso.trim() : ''
  const showAviso = Boolean(aviso)

  const cardapioHref =
    hasText(config.urlCardapio) && !isPlaceholder(config.urlCardapio)
      ? config.urlCardapio.trim()
      : '#'

  async function handleCopyPassword() {
    if (!wifiSenha) return
    const ok = await copyText(wifiSenha)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  const whatsappHref = showWhatsapp
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(config.whatsappMensagem)}`
    : '#'

  const igLabel = hasText(config.instagramHandle)
    ? config.instagramHandle.trim()
    : 'Instagram'

  return (
    <div className="safe-pad flex min-h-dvh justify-center">
      <main className="enter stage flex w-full max-w-[440px] flex-col gap-3.5">
        <header className="flex flex-col items-center px-1 pt-1 text-center text-cream">
          <div className="mark" aria-hidden="true">
            L
          </div>
          <h1 className="font-display mt-4 text-[2.05rem] leading-[1.02] font-extrabold tracking-tight text-balance sm:text-[2.35rem]">
            {config.nome}
          </h1>
          {hasText(config.categoria) && (
            <p className="chip mt-3">{config.categoria}</p>
          )}
          {hasText(config.fraseBoasVindas) && (
            <p className="mt-3 max-w-[20rem] text-[1.02rem] leading-snug font-medium text-cream/92 text-pretty">
              {config.fraseBoasVindas}
            </p>
          )}
        </header>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-tile hero-tile--pizza">
            <span>Pizza</span>
          </div>
          <div className="hero-tile hero-tile--burger">
            <span>Burger</span>
          </div>
        </div>

        <a href={cardapioHref} target="_blank" rel="noopener noreferrer" className="btn-cta">
          <MenuIcon />
          Ver cardápio e pedir
        </a>

        {(showWhatsapp || showInstagram) && (
          <section className="grid gap-2.5" aria-label="Contato">
            {showWhatsapp && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                <WhatsAppIcon />
                Pedir no WhatsApp
              </a>
            )}
            {showInstagram && (
              <a
                href={config.instagram.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ig"
              >
                <InstagramIcon />
                {igLabel}
              </a>
            )}
          </section>
        )}

        {showWifi && (
          <section aria-labelledby="wifi-title" className="card p-4">
            <h2 id="wifi-title" className="font-display text-[1.05rem] font-bold tracking-tight">
              Wi-Fi da casa
            </h2>
            <div className="mt-3 space-y-2">
              {wifiRede && (
                <div className="info-row">
                  <p className="text-[0.68rem] font-semibold tracking-wide text-ink-soft uppercase">
                    Rede
                  </p>
                  <p className="mt-0.5 text-[0.98rem] font-semibold break-all">{wifiRede}</p>
                </div>
              )}
              {wifiSenha && (
                <div className="info-row">
                  <p className="text-[0.68rem] font-semibold tracking-wide text-ink-soft uppercase">
                    Senha
                  </p>
                  <p className="mt-0.5 font-mono text-[1.05rem] font-semibold tracking-wide break-all">
                    {wifiSenha}
                  </p>
                </div>
              )}
            </div>
            {wifiSenha && (
              <button type="button" onClick={() => void handleCopyPassword()} className="btn-soft mt-3">
                {copied ? 'Senha copiada' : 'Copiar senha'}
              </button>
            )}
          </section>
        )}

        {showHorarios && (
          <section aria-labelledby="hours-title" className="card p-4">
            <h2 id="hours-title" className="font-display text-[1.05rem] font-bold tracking-tight">
              Horário
            </h2>
            <ul className="mt-2.5 space-y-1 text-[0.95rem] leading-relaxed">
              {horarios.map((linha) => (
                <li key={linha}>{linha}</li>
              ))}
            </ul>
          </section>
        )}

        {endereco && (
          <section aria-labelledby="address-title" className="card p-4">
            <h2 id="address-title" className="font-display text-[1.05rem] font-bold tracking-tight">
              Onde estamos
            </h2>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-pretty">{endereco}</p>
          </section>
        )}

        {showAviso && (
          <section aria-labelledby="notice-title" className="card border-mustard/50 p-4">
            <h2 id="notice-title" className="font-display text-[1.05rem] font-bold tracking-tight">
              Aviso
            </h2>
            <p className="mt-2 whitespace-pre-line text-[0.95rem] leading-relaxed text-pretty">
              {aviso}
            </p>
          </section>
        )}
      </main>
    </div>
  )
}
