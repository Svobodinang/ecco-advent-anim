const turnCardDurationMs = 900;

$(document).ready(function () {
    $(document).on('click', '.popup-advent__close', function () {
        $('body').removeClass('in-popup-advent');
        $('.popup-advent--show').removeClass('popup-advent--show');
    });
    $(document).on('click', '.giftcards__item.gift-exist', function (event) {
        let currentTimeout = 0;

        if (!event.currentTarget.classList.contains('show-front')) {
            currentTimeout = turnCardDurationMs;
            event.currentTarget.classList.add('show-front');
        }

        setTimeout(() => {
            const popupAlias = $(this).data('popup');
            if (popupAlias)
            {
                $('body').addClass('in-popup-advent');
                $('.'+popupAlias)?.addClass('popup-advent--show');
            }
        }, currentTimeout)
    });
    $(document).on('mousedown', function (e) {
        if ($('body').hasClass('in-popup-advent'))
        {
            const $popupAdventShow = document.querySelector('.popup-advent--show');
            if (e.target !== $popupAdventShow
                && !$popupAdventShow.contains(e.target))
            {
                $('body').removeClass('in-popup-advent');
                $('.popup-advent--show').removeClass('popup-advent--show');
            }
        }
    });
});

const setTranformOrigin = ({top, left, width, height}, mode) => {
    if (mode === 'bottom')
        console.log(`transform-origin: ${Math.round(left + width / 2)}px ${Math.round(top + height)}px`);
    if (mode === 'center')
        console.log(`transform-origin: ${Math.round(left + width / 2)}px ${Math.round(top + height / 2)}px`);
    if (mode === 'top')
        console.log(`transform-origin: ${Math.round(left + width / 2)}px ${Math.round(top)}px`);
}

setTimeout(() => {
    setTranformOrigin({
        width: 42,
        height: 42,
        top: 311,
        left: 293
    }, 'center')
}, 1000)