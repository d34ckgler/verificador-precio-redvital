import { getProduct, getProductPromotion } from './services/product.services';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IProduct } from './interface/IProduct';
import { Carousel } from 'flowbite-react';
import scanner from './assets/scan.svg';
import logo from './assets/red-mak.svg';
// Azucar sintetica
import './App.css';
import { getTaxRate } from './services/tax_rate.service';

function App() {
  // Hooks 
  const [branch, setBranch] = useState<string>('');
  const [tax, setTax] = useState<any>(null);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [promotions, setPromotions] = useState<Array<IProduct> | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [sku, setSku] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  // TimeOut
  let clearScan: any;

  // Ref
  const inputSearchRef: any = useRef(null);

  // Buscar producto
  const searchProduct = async (e: any) => {
    e.preventDefault();

    inputSearchRef!.current.value = "";
    clearTimeout(clearScan);

    // Deshabilitar campo de busqueda
    // inputSearchRef!.current.setAttribute('disabled',true);

    if (!sku) {
      setError(true);
      inputSearchRef!.current.focus();
      throw "Por favor, escanee un producto.";
    }

    const responseData: any = await getProduct(sku, searchParams);
    if (!responseData) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setProduct(responseData); // Re-Renderer
    }

    clearScan = setTimeout(() => {
      setError(false);
      setNotFound(false);
      setProduct(null);
      setSku("");
      inputSearchRef!.current.removeAttribute('disabled');
      inputSearchRef!.current.focus();
      clearTimeout(clearScan);
    }, 6000);
  };

  // Cargar Tasa
  if (!tax) {
    getTaxRate().then(taxRate => {
      console.info(taxRate);
      setTax(taxRate);
    });
  }

  // Cargar Promociones
  if (!promotions) {
    getProductPromotion(searchParams).then(promotionProducts => {
      setPromotions(promotionProducts);
    });
  }

  useEffect(() => { }, [product]);

  const getPicture = (sku: string) => {
    let baseUrl = "https://tienda.redvital.com/wp-content/uploads/2023/06/<sku>-300x300.jpg";
    return baseUrl.replace('<sku>', sku.slice(1));
  };

  const onLoadErrorPicture = ({currentTarget}) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="https://www.shutterstock.com/image-vector/premium-picture-icon-logo-line-600nw-749843887.jpg";
  }

  return (
    <>
      <div className="containers">
        <section className="product-contain">
          <header>
            <section className="header">
              <img
                src={logo}
                alt="redvital+makro"
                className="logo"
              />
              <div className="search-control">
                <input
                  type="text"
                  id="search-input"
                  ref={inputSearchRef}
                  className="search"
                  onChange={(e) => setSku(e.target.value)}
                  required
                  autoFocus={true}
                  placeholder="C&oacute;digo del producto"
                />
                <button
                  id="search-button"
                  className="btn-search"
                  // disabled={!!product}
                  onClick={searchProduct}
                >
                  Buscar
                </button>
              </div>
            </section>
          </header>
          {product && !notFound ? (
            <main className="product-info">
              <section className="header-product-info">
                <span
                  className={`tag-product ${!product.detail?.inOffert ? 'invisible' : ''
                    }`}
                >
                  En Oferta
                </span>
                <div className="tag-group">
                  <span className="tag-product yellow">Cirugia</span>
                  <span className="tag-product cyan">Insumos MQ</span>
                </div>
              </section>
              <section className="body-product-info">
                <span className="product-title">{product?.name}</span>
                <span className="upc">Codigo: {product.sku}</span>
                <span className="tag-product cyan">Marca: OKF</span>
              </section>
              <section className="footer-product-info">
                <section>
                  <p className="label-price">Precio</p>
                  <p className="price">
                    Bs. {(product.detail?.price * tax?.factor).toFixed(2) || (product.price * tax?.factor).toFixed(2)}
                  </p>
                </section>
                <section>
                  <p className="label-price">Precio Ref.</p>
                  <p className="price float-right">
                    {product.detail?.price || product.price} #
                  </p>
                </section>
              </section>
            </main>
          ) : notFound ? (
            <main className="not-found-contain">
              <span className="not-found">Producto no encontrado</span>
            </main>
          ) : null}

          {!product && !notFound ? (
            <main className="not-found-contain">
              <img className="scanner" src={scanner} alt="scanner" />
              <span className="not-found">
                Escanee el producto que desea consultar el precio
              </span>
            </main>
          ) : null}
        </section>

        <section className="promotion-contain">
          <Carousel className="text-green-500" draggable={true}>
            {
              promotions && promotions?.map(promotion => (
                <div id={promotion.sku}>
                  <div className="product">
                    <img
                      src={getPicture(promotion.sku)}
                      onError={onLoadErrorPicture}
                      alt={promotion.description}
                      className="product-img"
                    />
                    {
                      promotion.detail?.inPromotion ? 
                      (<span className="tag-promo">-30%</span>) : null
                    }
                  </div>
                  <div className="promotion-info">
                    <span className="promotion-title">
                      {promotion.name}
                    </span>
                    <span className="tag-product cyan">{promotion.mark}</span>
                    <p className="promotion-divider"></p>
                  </div>
                  <div className="promotion-price-container">
                    <span className="promotion-price">
                      <p>${(promotion.detail.price).toFixed(2).split('.')[0]}</p>
                      <i className="decimal">{(promotion.detail.price).toFixed(2).split('.')[1]}</i>
                    </span>
                    <span className="promotion-announce">¡SUPER PRECIOS!</span>
                  </div>
                </div>
              ))
            }
          </Carousel>

          {/* <div className="product">
            <img
              src="https://www.farmadon.com.ve/wp-content/uploads/2022/06/Clotrimazol-1-Crema-Vaginal-5-Aplicadores-X-50Gr.-Tiares-2v.png"
              alt="redvital+makro"
              className="product-img"
            />
            <span className="tag-promo">-30%</span>
          </div>
          <div className="promotion-info">
            <span className="promotion-title">
              CLOTRIMAZOL 1% X 30G CREM VAG TIARES
            </span>
            <span className="tag-product cyan">Medicamentos</span>
            <p className="promotion-divider"></p>
          </div>
          <div className="promotion-price-container">
            <span className="promotion-price">
              <p>$5</p>
              <i className="decimal">25</i>
            </span>
            <span className="promotion-announce">¡SUPER PRECIOS!</span>
          </div> */}
        </section>
      </div>
    </>
  );
}

export default App;
