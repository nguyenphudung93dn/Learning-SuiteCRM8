<?php

use Symfony\Component\DependencyInjection\Container;

if (!isset($container)) {
    return;
}

/** @var Container $container */
$extensions = $container->getParameter('extensions') ?? [];

$extensions['myExt'] = [
    'remoteEntry' => './extensions/my-ext/remoteEntry.js',
    'remoteName' => 'myExt',
    'enabled' => true
];

$container->setParameter('extensions', $extensions);