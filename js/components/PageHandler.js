import 'jquery-validation';

export default class PageHandler {
    constructor() {
        // initial values
        this.totalItems = 0;
        this.pieces = 0;
        this.grams = 0;
        $('#total').text(this.totalItems);
        $('#pieces-value').text(this.pieces);
        $('#grams-value').text(this.grams);

        // bindings
        this.init = this.init.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    init() {
        // form validation
        $('#add-product-form').validate({
            rules: {
                inputName: {
                    required: true,
                    minlength: 1,
                    maxlength: 50
                },
                inputAmount: {
                    required: true,
                    min: 1
                },
                unit: {
                    required: true,
                },
                category: {
                    required: true
                }

            },
            messages: {
                inputName: "Provide right product name (1-50 signs)",
                inputAmount: "Provide valid amount",
                unit: "Choose unit",
                category: "Select category"
            }
        });

        // event handlers
        $('#add-product-form').on('submit', this.addItem);
        $(document).on('click', '.remove', this.removeItem);
    }
    addItem(e) {
        e.preventDefault();

        // check if destination form is valid
        if ($('#add-product-form').valid()) {

            // get values from inputs
            const name = $('#inputName').val();
            const amount = $('#inputAmount').val();
            const unit = $("input[name='unit']:checked").val();
            const category = $('#category').children('option:selected').val();

            // check whether unit is piece or gram
            // then update total weight / amount
            switch (unit) {
                case 'pcs':
                    this.pieces += parseInt(amount);
                    $('#pieces-value').text(this.pieces);
                    break;
                case 'g':
                    this.grams += parseInt(amount);
                    $('#grams-value').text(this.grams);
                    break;
            }

            // update total items in list
            this.totalItems += 1;
            $('#total').text(this.totalItems);

            // generate and append li item using variables you got from form
            $('#' + category + ' > .list-group').append('<li class="list-group-item">' + name + '<span class="badge red-scheme ml-1"><span id="itemAmount">' + amount + '</span><span class="ml-1" id="itemUnit">' + unit + '</span></span><div class="my-1 dark-red-text"><i class="fas fa-edit"></i><i class="ml-2 fas fa-ban mx-2 remove"></i><i class="fas fa-file-export"></i></div></li>');
            $('#add-product-form').trigger('reset');
        }
    }
    removeItem(e) {
        e.preventDefault();
        // find badge with amount and unit info
        const itemAmount = $(e.target).parents('li').find('span#itemAmount').text();
        const itemUnit = $(e.target).parents('li').find('span#itemUnit').text();

        // check whether product has gram or piece unit
        // then update total weight / amount
        switch (itemUnit) {
            case 'pcs':
                this.pieces -= parseInt(itemAmount);
                $('#pieces-value').text(this.pieces);
                break;
            case 'g':
                this.grams -= parseInt(itemAmount);
                $('#grams-value').text(this.grams);
                break;
        }

        // update total items in list
        this.totalItems -= 1;
        $('#total').text(this.totalItems);

        // find and delete whole li element
        $(e.target).parents('li').remove();
    }
}