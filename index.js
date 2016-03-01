/* global hexo */
'use strict';

var spawnSync = require('child_process').spawnSync;
var path = require('path');

function rstCompile(data) {
    return function() {
        var config = hexo.config.rst || {};
        var initialHeaderLevel = config.initialHeaderLevel || 3;
        var syntaxHighlight = config.syntaxHighlight || 'short';

        var result = spawnSync(
            'rst2html',
            ['--template=' + path.join(__dirname, 'rst2html.txt'), '--initial-header-level=' + initialHeaderLevel, '--syntax-highlight=' + syntaxHighlight],
            {input: data.text}
        );

        if (result.error) {
            throw result.error;
        }

        return result.stdout.toString();
    }
}

function rstRenderer(data) {
    return rstCompile(data)();
}

rstRenderer.compile = rstCompile;

hexo.extend.renderer.register('rst', 'html', rstRenderer, true);
