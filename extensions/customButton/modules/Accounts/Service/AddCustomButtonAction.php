<?php

namespace App\Extension\cstmButton\modules\Accounts\Service;

use ApiPlatform\Core\Exception\InvalidArgumentException;
use App\Process\Entity\Process;
use App\Module\Service\ModuleNameMapperInterface;
use App\Process\Service\ProcessHandlerInterface;

use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerInterface;

class AddCustomButtonAction implements ProcessHandlerInterface, LoggerAwareInterface
{
    protected const MSG_OPTIONS_NOT_FOUND = 'Process options is not defined';
    protected const PROCESS_TYPE = 'record-add-custom-button';

    
    private $moduleNameMapper;
    protected $logger;

    public function __construct(ModuleNameMapperInterface $moduleNameMapper) {
        $this->moduleNameMapper = $moduleNameMapper;
    }

    public function getProcessType(): string {
        return self::PROCESS_TYPE;
    }

    public function requiredAuthRole(): string {
        return 'ROLE_USER';
    }

    public function configure(Process $process): void {
        //This process is synchronous
        //We aren't going to store a record on DB
        //thus we will use process type as the id
        $process->setId(self::PROCESS_TYPE);
        $process->setAsync(false);
    }

    public function validate(Process $process): void {
        if (empty($process->getOptions())) {
            throw new InvalidArgumentException(self::MSG_OPTIONS_NOT_FOUND);
        }
    }

    public function run(Process $process)
    {
        $options = $process->getOptions();
        $module =  $options['module']; // or "your-module"
        
        $responseData = [
            'handler' => 'redirect',
            'params' => [
                'route' => "$module/example",  //example - is a custom view called
                'queryParams' => [
                ]
            ]
        ];
        $process->setStatus('success');
        $process->setMessages([]);
        $process->setData($responseData);
    }

    public function setLogger(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }
}