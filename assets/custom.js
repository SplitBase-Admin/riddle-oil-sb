document.addEventListener("DOMContentLoaded", (event) => {

  window.collectionPageCustomFilters();
  
  function applyRcWidgetChanges() {
  // Your code to update span content and add HTML goes here
  document.querySelector(".rc_widget .rc-option__subsave .rc_widget__option__selector label span").innerHTML = "Subscribe";

  document.querySelector(".rc_widget .rc-option__subsave .rc-selling-plans").insertAdjacentHTML('afterbegin', `
    <div class="subscription-details">
        <div class="sub-details-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g opacity="0.72">
            <path d="M12.6667 3.3335L3.33333 12.6668M11.3333 12.6668C10.9797 12.6668 10.6406 12.5264 10.3905 12.2763C10.1405 12.0263 10 11.6871 10 11.3335C10 10.9799 10.1405 10.6407 10.3905 10.3907C10.6406 10.1406 10.9797 10.0002 11.3333 10.0002C11.687 10.0002 12.0261 10.1406 12.2761 10.3907C12.5262 10.6407 12.6667 10.9799 12.6667 11.3335C12.6667 11.6871 12.5262 12.0263 12.2761 12.2763C12.0261 12.5264 11.687 12.6668 11.3333 12.6668ZM4.66666 6.00016C4.31304 6.00016 3.9739 5.85969 3.72385 5.60964C3.4738 5.35959 3.33333 5.02045 3.33333 4.66683C3.33333 4.31321 3.4738 3.97407 3.72385 3.72402C3.9739 3.47397 4.31304 3.3335 4.66666 3.3335C5.02028 3.3335 5.35942 3.47397 5.60947 3.72402C5.85952 3.97407 6 4.31321 6 4.66683C6 5.02045 5.85952 5.35959 5.60947 5.60964C5.35942 5.85969 5.02028 6.00016 4.66666 6.00016Z" stroke="#101820" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
          </svg>
          <span>Save 10% off your third order and all future orders.</span>
        </div>
        <div class="sub-details-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <g opacity="0.72">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.99999 3.8335C6.17681 3.8335 6.34637 3.90373 6.4714 4.02876C6.59642 4.15378 6.66666 4.32335 6.66666 4.50016V12.5002C6.66666 12.677 6.59642 12.8465 6.4714 12.9716C6.34637 13.0966 6.17681 13.1668 5.99999 13.1668C5.82318 13.1668 5.65361 13.0966 5.52859 12.9716C5.40357 12.8465 5.33333 12.677 5.33333 12.5002V4.50016C5.33333 4.32335 5.40357 4.15378 5.52859 4.02876C5.65361 3.90373 5.82318 3.8335 5.99999 3.8335ZM9.99999 3.8335C10.1768 3.8335 10.3464 3.90373 10.4714 4.02876C10.5964 4.15378 10.6667 4.32335 10.6667 4.50016V12.5002C10.6667 12.677 10.5964 12.8465 10.4714 12.9716C10.3464 13.0966 10.1768 13.1668 9.99999 13.1668C9.82318 13.1668 9.65361 13.0966 9.52859 12.9716C9.40357 12.8465 9.33333 12.677 9.33333 12.5002V4.50016C9.33333 4.32335 9.40357 4.15378 9.52859 4.02876C9.65361 3.90373 9.82318 3.8335 9.99999 3.8335Z" fill="#101820"/>
            </g>
          </svg>
          <span>Pause, edit, or cancel anytime.</span>
        </div>
    </div>
  `);

    document.querySelectorAll('.rc_widget .rc-selling-plans__dropdown option').forEach((item)=>{
      let optionText = item.text.split('Delivery every')[1];
      item.text = optionText;
    })

    document.querySelectorAll(".rc_widget label.rc_widget__option__label").forEach(el => {
      el.closest(".rc-option").addEventListener("click", function(e){
        if(!e.currentTarget.classList.contains("rc-option--active")){
          const label = e.currentTarget.querySelector("label");
          if (label) {
            const clickEvent = new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            label.dispatchEvent(clickEvent);
          } else {
            console.warn("Label not found within the current target.");
          }

        }
      })
    })
  }
  
  // Set an interval to check for the existence of .rc_widget
  const intervalId = setInterval(() => {
    if (document.querySelector(".rc_widget")) {
      clearInterval(intervalId); // Stop the interval once .rc_widget is found
      applyRcWidgetChanges(); // Call the function to apply changes
    }
  }, 500); // Check every 500ms (half a second)

  const tabLinks = document.querySelectorAll('.link-tabs-items a[href*="#"]');
  const offset = 110;

  tabLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetElement = document.querySelector(this.hash);
      if (targetElement) {
        const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: topPosition,
          behavior: "smooth"
        });
      }
    });
  });
  
  /* Currency Changer -- Start */
  const currencySelectors = document.querySelectorAll('[data-disclosure-currency]');
  currencySelectors.forEach(function (currencySelector) {
    const currencyOptions = currencySelector.querySelectorAll('[data-disclosure-option]');
    currencyOptions.forEach(function (option) {
      option.addEventListener('click', function (event) {
        event.preventDefault();
        const currencyCode = option.getAttribute('data-value');
        const newUrl = `${window.location.origin}?currency=${currencyCode}`;
        fetchCurrency(newUrl);
      });
    });
    function fetchCurrency(newUrl) {
      fetch(newUrl)
      .then(response => {
        if (response.ok) {
          // On a successful response, reload the current page.
          location.reload();
        } else {
          console.error("Failed to fetch currency data.");
        }
      })
      .catch(error => {
        console.error("Error fetching currency data: ", error);
      });
    }
  });
  /* Currency Changer -- End */

  function elementsToRender(selectedVariant, closestDiv) {
    try {
      return [
        {
          element: closestDiv.querySelector(".grid-product__meta .grid-product__title"),
          content: selectedVariant.title,
          appendType: "innerHTML",
          attribute_name: "",
        },
        {
          element: closestDiv.querySelector(".grid-meta-container .grid-product__title"),
          content: selectedVariant.title,
          appendType: "innerHTML",
          attribute_name: "",
        },
        {
          element: closestDiv.querySelector(".grid-product__meta .grid-product__price"),
          content: `from ${theme.Currency.formatMoney(selectedVariant.price_min, theme.settings.moneyFormat)}`,
          appendType: "innerHTML",
          attribute_name: "",
        },
        {
          element: closestDiv.querySelector(".grid-product__content .grid-product__image-mask"),
          content: window.collCustomGroupProductsImages[selectedVariant.id]?.custom_image || "",
          appendType: "innerHTML",
          attribute_name: "",
        },
        {
          element: closestDiv.querySelector(".grid__item-image-wrapper .grid-product__link"),
          content: window.collCustomGroupProductsImages[selectedVariant.id]?.url || "#",
          appendType: "href",
          attribute_name: "",
        },
        {
          element: closestDiv.querySelector(".grid-product__content .custom-product--tags"),
          content: window.collCustomGroupProductsImages[selectedVariant.id]?.product_tags || "#",
          appendType: "innerHTML",
          attribute_name: "",
        },
        {
          element: closestDiv.querySelector(".product__card--url"),
          content: window.collCustomGroupProductsImages[selectedVariant.id]?.url || "#",
          appendType: "attribute",
          attribute_name: "data-url",
        },
      ];
    } catch (error) {
      console.error("Error generating elementsToRender array:", error);
      return []; // Return an empty array if an error occurs
    }
  }

  window.applyVariantChangeEvent = function(){
    document.querySelectorAll("[custom-variant-change]").forEach((el) => {
  
      if(el.classList.contains("event-added")){
        return;
      }
  
      el.classList.add("event-added");
      
      el.addEventListener("click", function (e) {
        try {
          const selectedVariant = window.collCustomGroupProducts[e.currentTarget.dataset.currentValue];
          if (!selectedVariant) {
            console.error("Selected variant not found for:", e.currentTarget.dataset.currentValue);
            return;
          }
    
          // Handle active class toggle for variant options
          const activeOption = e.currentTarget
            .closest(".custom-variant-selector-wrapper")
            ?.querySelector(".custom-variant-options.active");
          if (activeOption) {
            activeOption.classList.remove("active");
          } else {
            console.warn("Active custom-variant-option not found!");
          }
          e.currentTarget.classList.add("active");
    
          // Find the closest parent container
          const closestDiv = e.currentTarget.closest(".grid__item");
          if (!closestDiv) {
            console.error("Closest .grid__item not found for the clicked element!");
            return;
          }
    
          // Update elements based on appendType
          elementsToRender(selectedVariant, closestDiv).forEach(({ element, content, appendType, attribute_name }) => {
            if (element) {
              try {
                switch (appendType) {
                  case "innerHTML":
                    element.innerHTML = content; // Update innerHTML
                    break;
                  case "href":
                    element.setAttribute("href", content); // Update href attribute
                    break;
                  case "src":
                    element.setAttribute("src", content); // Update src attribute (e.g., for images)
                    break;
                  case "replace":
                    const newElement = document.createElement('div'); // or any other desired tag
                    newElement.innerHTML = content;
                    element.replaceWith(newElement); // Replace the current element with a new one
                    break;
                  case "attribute":
                    element.setAttribute(attribute_name, content);
                    break;
                  default:
                    console.warn(`Unknown appendType: ${appendType}`);
                }
              } catch (updateError) {
                console.error("Error updating element:", element, updateError);
              }
            } else {
              console.warn("Target element not found for update!");
            }
          });
    
          // Update opacity of the image element
          const imageElement = closestDiv.querySelector(".grid-product__content .grid-product__image-mask .image-element");
          if (imageElement) {
            imageElement.style.opacity = 1;
          } else {
            console.warn("Image element not found for opacity update!");
          }
        } catch (error) {
          console.error("Error in click event handler:", error);
        }
      });
    });
  }
  window.applyVariantChangeEvent();

});

// Add an event listener for the 'variant:change' event
document.addEventListener('variant:change', function (e) {
  try {
    const stickyProductBar = document.querySelector(".sticky-product-bar");
    if (!stickyProductBar) {
      return;
    }

    const stickyATCButton = stickyProductBar.querySelector(".sticky-ATC-btn .sticky-add-to-cart");
    if (!stickyATCButton) {
      return;
    }

    if (e.detail.variant && e.detail.variant.available) {
      stickyATCButton.removeAttribute("disabled");
      stickyATCButton.innerHTML = "Add To Bag";
    } else {
      stickyATCButton.setAttribute("disabled", "");
      stickyATCButton.innerHTML = "Sold Out";
    }
  } catch (error) {
    console.error("An error occurred while handling the 'variant:change' event:", error);
  }
});



window.matchHeight = function(selector) {
  const elements = document.querySelectorAll(selector);
  function setEqualHeight() {
    let maxHeight = 0;
    elements.forEach(element => {
      element.style.height = 'auto';
      const elementHeight = element.clientHeight;
      if (elementHeight > maxHeight) {
        maxHeight = elementHeight;
      }
    });

    elements.forEach(element => {
      element.style.height = `${maxHeight}px`;
    });
  }
  setEqualHeight();
  window.addEventListener('resize', setEqualHeight);
}
window.matchHeight('.community-saying-item-desc');
window.matchHeight('.community-saying-item-content');

const flickityViewport = document.querySelector(".rebuy-cart__flyout-recommendations .flickity-viewport");

if (flickityViewport) {
  const resizeObserver = new ResizeObserver(() => {
    const newHeight = flickityViewport.offsetHeight;
    document.querySelectorAll(".rebuy-cart__flyout-recommendations .flickity-viewport .rebuy-product-block").forEach(el => {
      el.style.minHeight = `${newHeight}px`;
    });
  });

  // Start observing the flickity viewport for height changes
  resizeObserver.observe(flickityViewport);
} 

window.updateCartDependencies = function(){
  // Update Theme Cart item count.
  setTimeout(function(){
    document.querySelector(".header-item .js-drawer-open-cart .cart-link__bubble").innerHTML = window.Rebuy.SmartCart.itemCount() == 0 ? "" : window.Rebuy.SmartCart.itemCount();
    document.querySelector(".header-item .js-drawer-open-cart .cart-link__bubble").classList.remove("visually-hidden");
  }, 1000);

  // Get shoppay widget from cart page.
  window.fetchShopPayCartWidget();
  window.addTermsAndConditionsClickEvent();
}

window.fetchShopPayCartWidget = function() {
  fetch('/cart', {
    method: 'GET',
    headers: { 'Content-Type': 'text/html' },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text(); // Get the HTML content as text
  })
  .then(htmlContent => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const shopPayWidget = doc.querySelector('[shop-pay-cart-widget]');
    if (shopPayWidget) {
      document.body.classList.add("shop-pay-widget-adding")
      if(document.querySelector(".rebuy-cart__flyout [shopify-payment-terms-rebuy-smartcart] shopify-payment-terms")){
        document.querySelector(".rebuy-cart__flyout [shopify-payment-terms-rebuy-smartcart]").innerHTML = ""
      }
      document.querySelector(".rebuy-cart__flyout [shopify-payment-terms-rebuy-smartcart]").innerHTML = shopPayWidget.innerHTML;

      // document.querySelector('div[shopify-payment-terms-rebuy-smartcart] shopify-payment-terms')?.shadowRoot?.querySelector('shop-pay-installments-banner')?.shadowRoot?.querySelector('.shopify-installments')?.style?.fontSize = '13px';
      // document.querySelector('div[shopify-payment-terms-rebuy-smartcart] shopify-payment-terms')?.shadowRoot?.querySelector('shop-pay-installments-banner')?.shadowRoot?.querySelector('.shopify-installments')?.style?.letterSpacing = '-0.02em';
      // document.querySelector('div[shopify-payment-terms-rebuy-smartcart] shopify-payment-terms')?.shadowRoot?.querySelector('shop-pay-installments-banner')?.shadowRoot?.querySelector('.shopify-installments')?.style?.lineHeight = '18.2px';
      // document.querySelector('div[shopify-payment-terms-rebuy-smartcart] shopify-payment-terms')?.shadowRoot?.querySelector('shop-pay-installments-banner')?.shadowRoot?.querySelector('.shopify-installments')?.style?.color = '#101820';
      // document.querySelector('div[shopify-payment-terms-rebuy-smartcart] shopify-payment-terms')?.shadowRoot?.querySelector('shop-pay-installments-banner')?.shadowRoot?.querySelector('.shopify-installments__prequal-row-wrapper')?.style?.display = 'none';
      // document.querySelector('div[shopify-payment-terms-rebuy-smartcart] shopify-payment-terms')?.shadowRoot?.querySelector('shop-pay-installments-banner')?.shadowRoot?.querySelector('.shopify-installments b')?.style?.fontWeight = '400';

      // Access the shadow roots and elements once
      const shopifyPaymentTerms = document.querySelector('div[shopify-payment-terms-rebuy-smartcart] shopify-payment-terms')?.shadowRoot;
      const shopPayInstallmentsBanner = shopifyPaymentTerms?.querySelector('shop-pay-installments-banner')?.shadowRoot;
      
      if (shopPayInstallmentsBanner) {
        const shopifyInstallments = shopPayInstallmentsBanner.querySelector('.shopify-installments');
        const prequalRowWrapper = shopPayInstallmentsBanner.querySelector('.shopify-installments__prequal-row-wrapper');
        
      
        // Apply styles to elements
        if (shopifyInstallments) {
          shopifyInstallments.style.fontSize = '13px';
          shopifyInstallments.style.letterSpacing = '-0.02em';
          shopifyInstallments.style.lineHeight = '18.2px';
          shopifyInstallments.style.color = '#101820';
        }
      
        if (prequalRowWrapper) {
          prequalRowWrapper.style.display = 'none';
        }

        setTimeout(()=>{
          const boldText = shopifyInstallments?.querySelector('b');
          if (boldText) {
            boldText.style.fontWeight = '400';
          }  
        },100)
        
      }

      setTimeout(function(){
        document.body.classList.remove("shop-pay-widget-adding")
      }, 2000)
    } else {
      console.error('Shop Pay Cart Widget not found!');
    }
  })
  .catch(error => {
    console.error('Error fetching /cart:', error);
  });
}

window.addTermsAndConditionsClickEvent = function () {
  try {
    const tacButton = document.querySelector("#rebuy-cart .rebuy-cart__flyout-footer .rebuy-cart__flyout-actions a");
    if (!tacButton) {
      throw new Error("The 'Terms and Conditions' button element is not found.");
    }
    
    if (tacButton.classList.contains("event_added")) {
      return;
    }
    
    tacButton.classList.add("event_added");
    tacButton.addEventListener("click", function (e) {
      try {
        e.preventDefault();        
        if (window.tacModal && window.tacModal.style) {
          window.tacModal.style.transform = "translateX(0)";
        } else {
          throw new Error("The 'Terms and Conditions' modal (tacModal) is not properly defined.");
        }
      } catch (modalError) {
        // console.log("Modal Error: ", modalError);
      }
      
    });
  } catch (error) {
    // console.log("Error: ", error);
  }
};

document.addEventListener('rebuy:smartcart.init', (event) => {
  window.updateCartDependencies();
});

document.addEventListener('rebuy:smartcart.show', (event) => {
  window.updateCartDependencies();
  document.querySelector("#rebuy-cart__progress-bar-meter-label")?.click();
});

document.addEventListener('rebuy:cart.add', (event) => { 
  window.updateCartDependencies();
});

document.addEventListener("rebuy:smartcart.line-item-increase", (event) => {
  window.updateCartDependencies();
});

document.addEventListener("rebuy:smartcart.line-item-decrease", (event) => {  
  window.updateCartDependencies();
});

document.addEventListener("rebuy:smartcart.line-item-removed", (event) => {
  window.updateCartDependencies();
});``


// Check if any .link-tabs-items a elements exist
if (document.querySelectorAll('.link-tabs-items a').length > 0) {
  // Select all anchor elements inside the .link-tabs-items container
  const tabLinks = document.querySelectorAll('.link-tabs-items a');

  // Add click event listener to each anchor
  tabLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      // Remove the active class from all anchors
      tabLinks.forEach(link => link.classList.remove('active'));

      // Add the active class to the clicked anchor
      this.classList.add('active');
    });
  });
}

document.addEventListener("DOMContentLoaded", (event) => {

  if(window.location.href.includes("/products/")){
    if(document.querySelector("#gift-box-product")){
      document.querySelector("#gift-box-product").addEventListener("click", function (e) {
        try {
          if (e.currentTarget.checked) {
            const inputElement = document.querySelector(".variant-wrapper fieldset input[value*='with gift box']");
            if (!inputElement) {
              // console.error("Input with value containing 'with gift box' not found.");
              return;
            }  
            const labelElement = inputElement.parentNode.querySelector("label");
            if (!labelElement) {
              // console.error("Label for input 'with gift box' not found.");
              return;
            }
            labelElement.click();
          } else {
            const labelElement = document.querySelector(".variant-wrapper fieldset .variant-input label");
            if (!labelElement) {
              console.error("Default label not found.");
              return;
            }
            // console.log("Default label found:", labelElement);
            labelElement.click();
          }
        } catch (error) {
          // console.error("An error occurred:", error.message);
        }
      });
    }
  }

  // document.querySelector(".sticky-product-bar .sticky-ATC-btn").addEventListener("click", function (e) {
  //   const atcButton = document.querySelector(".page-content--product [data-product-blocks] .product-block [data-add-to-cart]");
  //   if (atcButton) {
  //     const clickEvent = new MouseEvent('click', {
  //       bubbles: true,
  //       cancelable: true,
  //       view: window
  //     });
  //     atcButton.dispatchEvent(clickEvent);
  //   } else {
  //     console.warn("Add to Cart button not found."); 
  //   }
  // });

  // Wrap the code in a DOMContentLoaded event listener
  try {
    if(document.querySelector("[data-custom-checked-variant-title]")){
      if(document.querySelector("[data-custom-checked-variant-title]").dataset.customCheckedVariantTitle.trim() != ""){
        
        
        const inputElement = document.querySelector(`[data-value="${ document.querySelector("[data-custom-checked-variant-title]").dataset.customCheckedVariantTitle.trim() }"] input`) || document.querySelector(`[data-value="${ document.querySelector("[data-custom-checked-variant-title-with-zeros]").dataset.customCheckedVariantTitleWithZeros.trim() }"] input`) ;
        if (!inputElement) {
          throw new Error("Element with [data-value='" + document.querySelector("[data-custom-checked-variant-title]").dataset.customCheckedVariantTitle.trim() + "'] input not found in the DOM.");
        }
        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window
        });
        inputElement.dispatchEvent(clickEvent);
      }
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
});

/* Load more -- Start */
if(document.querySelectorAll(".load-more-wrapper .load-more").length > 0){
  eventSelectors  = {
    _loadMoreButton : document.querySelector(".load-more-wrapper .load-more"),      
    _currentPage: 1
  }
  
  window.loadMoreProducts = {
    _init : function(){
      this._eventBinder();
      this._resetValuesOnFilterChange();
      this._bindProductCardClick();
    },
    _eventBinder : function() {
      eventSelectors._loadMoreButton = document.querySelector(".load-more-wrapper .load-more");
      eventSelectors._loadMoreButton.addEventListener('click', this._handleLoadMore.bind(this), true );
    },
    _updatePageQueryParam: function (url, newPage) {
      const urlObj = new URL(url);
      urlObj.searchParams.set('page', newPage);
      return urlObj.toString();
    },
    _handleLoadMore : function(event){
      event.preventDefault();
      if(document.querySelectorAll(".pagination-wrapper").length > 0){
        eventSelectors._totalPages = parseInt(document.querySelector(".pagination-wrapper").dataset.total_pages)
        if(eventSelectors._currentPage <= eventSelectors._totalPages){
          eventSelectors._currentPage = eventSelectors._currentPage + 1;
          fetchUrl = this._updatePageQueryParam(window.location.href, eventSelectors._currentPage);
          this._fetchAndAppendProductGrids(fetchUrl);
          this._showHideLoadMoreButton()
        }
      }
    },
   _extractAndExecuteScript: function(htmlData) {
      let scripts = htmlData.getElementsByTagName("script");
      for (let script of scripts) {
        let scriptContent = script.innerText.trim();
        if (scriptContent) {
          try {
            if (scriptContent.startsWith("{") && scriptContent.endsWith("}")) {
              // console.warn("Skipping JSON script:", scriptContent);
              continue;
            }
            new Function(scriptContent)();
          } catch (error) {
            console.error("Error executing script:", error, "\nScript Content:\n", scriptContent);
          }
        }
      }
    },
    _fetchAndAppendProductGrids: function(fetchUrl){
      fetch(fetchUrl)
      .then(response => response.text())
      .then(html => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const productGrid = tempDiv.querySelector('#product-grid');
        this._extractAndExecuteScript(tempDiv.querySelector('#CollectionAjaxContent'));
        if (productGrid) {
          const childElements = productGrid.children;
          const targetElement = document.querySelector('#product-grid');
          for (let i = 0; i < childElements.length; i++) {
            targetElement.appendChild(childElements[i].cloneNode(true));
          }
          document.querySelectorAll(".image-element").forEach(el => {
            el.style.opacity = 1
          });
          this._bindProductCardClick(); // Rebind event listeners after new content is added
          window.applyVariantChangeEvent();
        } else {
          console.log('#product-grid not found in the HTML.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    _showHideLoadMoreButton(){
      (eventSelectors._currentPage >= eventSelectors._totalPages) ? eventSelectors._loadMoreButton.classList.add("hidden") : eventSelectors._loadMoreButton.classList.remove("hidden") ;
    },
    _resetValuesOnFilterChange: function(){
      if(document.querySelectorAll(".pagination-wrapper").length == 0){
        eventSelectors._loadMoreButton.classList.add("hidden");
      }
      eventSelectors._currentPage = 1;
    },
    _bindProductCardClick: function(){
      document.querySelectorAll(".product__card--url").forEach(card => {
        card.addEventListener("click", function(event) {
          if (!event.target.closest(".custom-variant-options")) {
            window.location.href = this.getAttribute("data-url");
          }
        });
      });
    }
  }
  window.loadMoreProducts._init();
}
/* Load more -- End */


// Listen for the custom event
document.addEventListener('filter:changed', () => {
  window.loadMoreProducts._init()
  window.collectionPageCustomFilters();
});

window.collectionPageCustomFilters = function(){
  if(document.querySelector(".js-custom-drawer-open-collection-filters")){
    document.querySelector(".js-custom-drawer-open-collection-filters").addEventListener("click", function(e){
      e.currentTarget.closest(".collection-filter__item").querySelector(".top__filter--content").classList.toggle("hidden");
      e.currentTarget.classList.toggle("custom-filter-drawer-open");
    })
  }
  
  // document.querySelectorAll("[custom-collapsible-btn]").forEach(el => {
  //   el.addEventListener("click", function(e){
  //     document.querySelectorAll(`#${ e.currentTarget.dataset.customCollapsibleId }`).forEach(ele => {
  //       ele.classList.toggle("hidden");
  //     })
  //   })
  // })
}

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".product-review-label-review")?.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default behavior (if it's a link)
  
        const reviewsSection = document.querySelector("#okendo-reviews-section");
        if (reviewsSection) {
            const offset = 100; // Offset from the top
            const topPosition = reviewsSection.getBoundingClientRect().top + window.scrollY - offset;
  
            window.scrollTo({ top: topPosition, behavior: "smooth" });
        }
    });
  
    /* Variable declaration for Terms and Conditions Modal - To be used with Rebuy's "rebuy:smartcart.show" method */
  try {
    window.tacModal = document.getElementById("tac-modal");
    window.tacModalClose = document.querySelector(".tac-modal-close");
  
    // Add event listener for close button
    if (window.tacModalClose) {
      window.tacModalClose.onclick = function () {
        if (window.tacModal) {
          window.tacModal.style.transform = "translateX(100%)";
        }
      };
    }
  
    // Add event listener for clicks outside the modal
    window.onclick = function (event) {
      if (event.target === window.tacModal) {
        if (window.tacModal) {
          window.tacModal.style.transform = "translateX(100%)";
        }
      }
    };
  } catch (e) {
    // console.log("Error with tac Modal Code", e);
  }
});

document.querySelectorAll(".product__card--url").forEach(card => {
  card.addEventListener("click", function(event) {
      // Prevent navigation when clicking on a variant button
      if (!event.target.closest(".custom-variant-options")) {
          window.location.href = this.getAttribute("data-url");
      }
  });
});
