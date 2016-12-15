/*global browser*/

describe('component-1 test suite', function () {
    'use strict';

    it('should open the dialog-a', function () {
        var homepage = new Homepage();
        var taskList = new TaskList();
        homepage.get();
        homepage.taskListLink.click();
        expect(browser.isElementPresent(taskList.addTaskBtn));
    });

    it('should view task', function () {
        var taskList = new TaskList();
        taskList.get();
        taskList.taskBookShp.click();
        expect(browser.isElementPresent(taskList.taskOk));
    })

    it('should add task', function () {
        var taskList = new TaskList();
        var modal = new AddModal();
        taskList.get();
        taskList.addTask();
        expect(browser.isElementPresent(modal.modalTitle));
        expect(modal.modalTitle.getText()).toEqual('Add a new task');
        modal.selectShopping();
        modal.addTitle('Protractor test');
        modal.setPriority('MEDIUM');
        modal.addContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam');
        modal.selectDate('20');
        modal.selectStatus('PENDING');
        modal.submitTask();
    })



    var Homepage = function () {
        this.taskListLink = element(by.id('lst_link'));
        this.get = function () {
            browser.get('http://localhost:9000/#/');
        };
    };

    var TaskList = function () {
        this.addTaskBtn = element(by.id('add_task'));
        this.taskBookShp = element(by.xpath('//*[@id="app"]/div[2]/div/section/div/table/tbody/tr[4]'));
        this.taskOk = element(by.id('ok_btn'));

        this.get = function () {
            browser.get('http://localhost:9000/#/component-1/dialog-a');
        };
        this.addTask = function () {
            return this.addTaskBtn.click();
        }
    }

    var AddModal = function () {
        var selectShopping = element(by.id('cat_meet'));
        var title = element(by.id('title'));
        var priority = element(by.id('priority'));
        var content = element(by.id('content'));
        var date = element(by.id('date'));
        var status = element(by.id('status'));

        this.addTaskBtn = element(by.id('add_task'));

        this.modalTitle = element(by.id('modal_title'));

        this.selectShopping = function () {
            return selectShopping.click();
        }
        this.addTitle = function (text) {
            return title.sendKeys(text);
        }
        this.setPriority = function (priority) {
            return element(by.cssContainingText('option', priority)).click();
        }
        this.addContent = function (text) {
            return content.sendKeys(text);
        }
        this.selectDate = function (day) {
            date.click();
            element(by.buttonText(day)).click();
        }
        this.selectStatus = function (status) {
            return element(by.cssContainingText('option', status)).click();
        }
        this.submitTask = function () {
            return element(by.cssContainingText('button','Submit')).click();
        }
        
    }


});