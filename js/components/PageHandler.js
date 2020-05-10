import 'jquery-validation';
import { generateListItem } from './listElementGenerator';
import { storageUpdate } from './storageUpdate';
import { storageRead } from './storageRead';
import { updatePage } from './updatePage';

export default class PageHandler {
    constructor() {
        // initial values

        this.pageState = storageRead();
        updatePage(this.pageState);

        $('#total').text(this.pageState.totalItems);
        $('#pieces-value').text(this.pageState.pieces);
        $('#grams-value').text(this.pageState.grams);

        // bindings
        this.init = this.init.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.editItem = this.editItem.bind(this);
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

        $('#edit-product-form').validate({
            rules: {
                editName: {
                    required: true,
                    minlength: 1,
                    maxlength: 50
                },
                editAmount: {
                    required: true,
                    min: 1
                },
                newUnit: {
                    required: true,
                }
            },
            messages: {
                editName: "Provide right product name (1-50 signs)",
                editAmount: "Provide valid amount",
                newUnit: "Choose unit",
            }
        });

        // event handlers
        $('#add-product-form').on('submit', this.addItem);
        $(document).on('click', '.remove', this.removeItem);
        $(document).on('click', '.edit', this.editItem);
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
                    this.pageState.pieces += parseInt(amount);
                    $('#pieces-value').text(this.pageState.pieces);
                    break;
                case 'g':
                    this.pageState.grams += parseInt(amount);
                    $('#grams-value').text(this.pageState.grams);
                    break;
            }

            // update total items in list
            this.pageState.totalItems += 1;
            $('#total').text(this.pageState.totalItems);

            //generate li element
            let generatedLi = generateListItem(name, amount, unit);

            // append li item using variables you got from form
            $(`#${category} > .list-group`).append(generatedLi);

            switch(category) {
                case 'vegetables':
                    this.pageState.vegetables.push(generatedLi);
                    break;
                case 'fruits':
                    this.pageState.fruits.push(generatedLi);
                    break;
                case 'dairy':
                    this.pageState.dairy.push(generatedLi);
                    break;
                case 'bread':
                    this.pageState.bread.push(generatedLi);
                    break;
                case 'hygiene':
                    this.pageState.hygiene.push(generatedLi);
                    break;
            }
            storageUpdate(this.pageState);
            $('#add-product-form').trigger('reset');
        }
    }

    removeItem(e) {
        e.preventDefault();
        // find badge with amount and unit info
        const itemAmount = $(e.target).parents('li').find('span#itemAmount').text();
        const itemUnit = $(e.target).parents('li').find('span#itemUnit').text();
        const itemCategory = $(e.target).parents('div.tab-pane').attr('id');
        const position = $(e.target).parents('li').index();

        switch(itemCategory) {
            case 'vegetables':
                this.pageState.vegetables.splice(position, 1);
                break;
            case 'fruits':
                this.pageState.fruits.splice(position, 1);
                break;
            case 'dairy':
                this.pageState.dairy.splice(position, 1);
                break;
            case 'bread':
                this.pageState.bread.splice(position, 1);
                break;
            case 'hygiene':
                this.pageState.hygiene.splice(position, 1);
                break;
        }

        // check whether product has gram or piece unit
        // then update total weight / amount
        switch (itemUnit) {
            case 'pcs':
                this.pageState.pieces -= parseInt(itemAmount);
                $('#pieces-value').text(this.pageState.pieces);
                break;
            case 'g':
                this.pageState.grams -= parseInt(itemAmount);
                $('#grams-value').text(this.pageState.grams);
                break;
        }

        // update total items in list
        this.pageState.totalItems -= 1;
        $('#total').text(this.pageState.totalItems);

        // find and delete whole li element
        $(e.target).parents('li').remove();

        storageUpdate(this.pageState);
    }

    editItem(e) {
        $('#exampleModalCenter').modal('show');
        $('#edit-product-form').submit({event: e, thisObj: this}, this.handleEditSubmit);
    }

    handleEditSubmit(e) {
        console.log(e);
        e.preventDefault();
        const { event, thisObj } = e.data;
        const prevListItem = $(event.target).parents('li')[0]; 
        const currentCategory = $(event.target).parents('div.tab-pane').attr('id');
        const oldAmount = $(event.target).parents('li').find('span#itemAmount').text();
        const oldUnit = $(event.target).parents('li').find('span#itemUnit').text();
        const position = $(event.target).parents('li').index();
        console.log(position);

        if ($('#edit-product-form').valid()) {
            const newName = $('#editName').val();
            const newAmount = $('#editAmount').val();
            const newUnit = $("input[name='newUnit']:checked").val();
            let newListElement = generateListItem(newName, newAmount, newUnit);

            $(prevListItem).replaceWith(newListElement);

            switch(currentCategory) {
                case 'vegetables':
                    thisObj.pageState.vegetables[position] = newListElement;
                    break;
                case 'fruits':
                    thisObj.pageState.fruits[position] = newListElement;
                    break;
                case 'dairy':
                    thisObj.pageState.dairy[position] = newListElement;
                    break;
                case 'bread':
                    thisObj.pageState.bread[position] = newListElement;
                    break;
                case 'hygiene':
                    thisObj.pageState.hygiene[position] = newListElement;
                    break;
            }

            switch (oldUnit) {
                case 'pcs':
                    thisObj.pageState.pieces -= parseInt(oldAmount);
                    $('#pieces-value').text(thisObj.pageState.pieces);
                    break;
                case 'g':
                    thisObj.pageState.grams -= parseInt(oldAmount);
                    $('#grams-value').text(thisObj.pageState.grams);
                    break;
            }

            switch (newUnit) {
                case 'pcs':
                    thisObj.pageState.pieces += parseInt(newAmount);
                    $('#pieces-value').text(thisObj.pageState.pieces);
                    break;
                case 'g':
                    thisObj.pageState.grams += parseInt(newAmount);
                    $('#grams-value').text(thisObj.pageState.grams);
                    break;
            }

            storageUpdate(thisObj.pageState);
            $('#edit-product-form').trigger('reset');
            $('#exampleModalCenter').modal('hide');
        }

        $('#edit-product-form').off("submit");
    }
}