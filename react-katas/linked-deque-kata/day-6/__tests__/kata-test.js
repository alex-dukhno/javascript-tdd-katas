import React from 'react';
import TestUtils from 'react-addons-test-utils';
import LinkedDeque from '../kata';

describe("linked deque", () => {
    let deque;
    let input;
    let addFront;

    beforeEach(() => {
        deque = TestUtils.renderIntoDocument(
            <LinkedDeque/>
        );
        input = TestUtils.findRenderedDOMComponentWithTag(deque, 'input');
        addFront = TestUtils.findRenderedDOMComponentWithClass(deque, 'add-front-button');
    });

    function getItems() {
        return TestUtils.scryRenderedDOMComponentsWithClass(deque, 'item').map((item) => Number(item.textContent));
    }

    test("newly created deque is empty", () => {
        expect(getItems()).toEqual([]);
    });

    function addItems(size, action) {
        for (let i = 1; i < size + 1; i++) {
            input.value = i * 10;
            TestUtils.Simulate.change(input);
            TestUtils.Simulate.click(action);
        }
    }

    test("add one item in front", () => {
        addItems(1, addFront);

        expect(getItems()).toEqual([10]);
    });

    test("add three items in front", () => {
        addItems(3, addFront);

        expect(getItems()).toEqual([30, 20, 10]);
    });

    test("remove one item from front", () => {
        addItems(3, addFront);

        const removeFront = TestUtils.findRenderedDOMComponentWithClass(deque, 'remove-front-button');
        TestUtils.Simulate.click(removeFront);

        expect(getItems()).toEqual([20, 10]);
    });

    test("add three items in back", () => {
        const addBack = TestUtils.findRenderedDOMComponentWithClass(deque, 'add-back-button');

        addItems(3, addBack);

        expect(getItems()).toEqual([10, 20, 30]);
    });

    test("remove one item from back", () => {
        addItems(3, addFront);

        const removeBack = TestUtils.findRenderedDOMComponentWithClass(deque, 'remove-back-button');
        TestUtils.Simulate.click(removeBack);

        expect(getItems()).toEqual([30, 20]);
    });

    test("newly created deque rendered as an empty string", () => {
        const renderedDeque = TestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('');
    });

    test("single element is surrounded by '<-' and '->'", () => {
        addItems(1, addFront);

        const renderedDeque = TestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('<-10->');
    });

    test("items that have neighbours surrounded by '<=>'", () => {
        addItems(3, addFront);

        const renderedDeque = TestUtils.findRenderedDOMComponentWithClass(deque, 'items').textContent;

        expect(renderedDeque).toBe('<-30<=>20<=>10->');
    })
});
